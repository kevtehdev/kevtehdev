"use client";

import { useEffect, useRef } from "react";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

/*
 * A grid of dots. Slow value noise swells some of them into soft waves, and
 * dots near the pointer grow and turn green. Everything is drawn per pixel in
 * one pass, so there is no geometry to build or upload.
 */
const fragment = `
precision mediump float;
uniform float uTime;
uniform float uDpr;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uAccent;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  float spacing = 22.0 * uDpr;
  vec2 cell = floor(gl_FragCoord.xy / spacing);
  vec2 center = (cell + 0.5) * spacing;

  float wave = noise(cell * 0.09 + vec2(uTime * 0.06, uTime * 0.035));
  wave = smoothstep(0.35, 0.9, wave);
  float near = 1.0 - smoothstep(0.0, 170.0 * uDpr, distance(center, uPointer));

  float radius = (0.7 + 1.5 * wave + 1.8 * near) * uDpr;
  float edge = 0.8 * uDpr;
  float dot = 1.0 - smoothstep(radius - edge, radius + edge, distance(gl_FragCoord.xy, center));
  float alpha = dot * (0.16 + 0.42 * wave + 0.75 * near);

  vec3 color = mix(uInk, uAccent, near);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

/** "#1d7a3c" → [0.11, 0.48, 0.24], read from the page's colour tokens. */
function token(name: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
  const n = Number.parseInt(hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  return s;
}

/**
 * The quiet moving backdrop behind the top of every page. Decorative only:
 * hidden from screen readers, never takes clicks, pauses when off-screen or
 * in a background tab, and holds still for visitors who prefer reduced motion.
 * Without WebGL it simply isn't there.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: true });
    if (!canvas || !gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uTime = u("uTime");
    const uDpr = u("uDpr");
    const uPointer = u("uPointer");
    const uInk = u("uInk");
    const uAccent = u("uAccent");

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const dark = matchMedia("(prefers-color-scheme: dark)");
    let dpr = 1;
    let time = 0;
    let last = 0;
    let frame = 0;
    let onScreen = true;
    // The glow eases toward the pointer instead of snapping to it.
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };

    function colors() {
      gl!.uniform3fv(uInk, token("--fg"));
      gl!.uniform3fv(uAccent, token("--pass"));
    }

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(canvas!.clientWidth * dpr);
      canvas!.height = Math.round(canvas!.clientHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform1f(uDpr, dpr);
    }

    function draw() {
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      gl!.uniform1f(uTime, time);
      gl!.uniform2f(uPointer, pointer.x, pointer.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function tick(now: number) {
      time += Math.min((now - last) / 1000, 0.1);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function play() {
      cancelAnimationFrame(frame);
      if (still.matches || !onScreen || document.hidden) return void draw();
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) * dpr;
      pointer.ty = (rect.bottom - e.clientY) * dpr;
    }

    function onTheme() {
      colors();
      draw();
    }

    const resizer = new ResizeObserver(() => {
      resize();
      draw();
    });
    const watcher = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      play();
    });

    colors();
    resize();
    resizer.observe(canvas);
    watcher.observe(canvas);
    addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", play);
    still.addEventListener("change", play);
    dark.addEventListener("change", onTheme);
    play();

    return () => {
      cancelAnimationFrame(frame);
      resizer.disconnect();
      watcher.disconnect();
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", play);
      still.removeEventListener("change", play);
      dark.removeEventListener("change", onTheme);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-reveal
      className="pointer-events-none absolute inset-x-0 top-24 h-[min(90svh,50rem)] [mask-image:radial-gradient(ellipse_80%_45%_at_85%_20%,black,transparent_72%)] opacity-70 sm:[mask-image:radial-gradient(ellipse_55%_70%_at_80%_30%,black_20%,transparent_75%)] sm:opacity-100"
    >
      <canvas ref={ref} className="size-full" />
    </div>
  );
}

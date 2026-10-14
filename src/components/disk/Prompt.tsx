"use client";

import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";

/** Fired by the menu bar button; the prompt listens for it. */
export const OPEN_PROMPT_EVENT = "kevdev:open-prompt";

export type PromptFile = { name: string; view: string; href: string; description: string; content: string[] };

export type PromptLabels = {
  label: string;
  input: string;
  hint: string;
  close: string;
  volume: string;
  files: string;
  /** Contains "{file}". */
  opening: string;
  /** Contains "{language}". */
  switching: string;
  /** Contains "{file}". */
  tip: string;
  unknown: string;
  version: string;
  help: { command: string; text: string }[];
};

type Line = { text: string; dim?: boolean; indent?: boolean };

type PromptProps = {
  files: PromptFile[];
  homeHref: string;
  languages: Record<string, string>;
  labels: PromptLabels;
};

const base = (name: string) => name.toLowerCase().replace(/\.txt$/, "");

/**
 * The A:\> prompt. Press "/" anywhere (or use the menu bar button) and the
 * label turns into a DOS prompt: `dir` lists the files, typing a file's name
 * opens it, `lang sv` switches language and Esc closes it.
 */
export function Prompt({ files, homeHref, languages, labels }: PromptProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const historyIndex = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function show() {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setLines((current) => (current.length ? current : [{ text: labels.version }, { text: labels.hint, dim: true }]));
      setOpen(true);
    }
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      event.preventDefault();
      show();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PROMPT_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PROMPT_EVENT, show);
    };
  }, [labels.version, labels.hint]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  function close() {
    setOpen(false);
    setValue("");
    returnFocus.current?.focus();
  }

  function go(href: string, message: string) {
    setLines((current) => [...current, { text: message, dim: true }]);
    window.setTimeout(() => {
      router.push(href);
      close();
    }, 350);
  }

  function find(name: string) {
    const wanted = base(name);
    return files.find((file) => file.view === wanted || base(file.name) === wanted);
  }

  function run(raw: string) {
    const command = raw.trim();
    const echo: Line = { text: `A:\\> ${command}` };
    const [word = "", ...rest] = command.toLowerCase().split(/\s+/);
    const argument = rest.join(" ");
    const say = (...output: Line[]) => setLines((current) => [...current, echo, ...output, { text: "" }]);

    if (command) {
      history.current.push(command);
      historyIndex.current = history.current.length;
    }

    switch (word) {
      case "":
        setLines((current) => [...current, echo]);
        return;
      case "help":
        say(...labels.help.map(({ command: name, text }) => ({ text: ` ${name.padEnd(14)}${text}` })));
        return;
      case "dir":
        say(
          { text: ` ${labels.volume}`, dim: true },
          ...files.map((file) => ({ text: ` ${base(file.name).toUpperCase().padEnd(10)}TXT   ${file.description}` })),
          { text: `        ${labels.files}`, dim: true },
        );
        return;
      case "cls":
        setLines([]);
        return;
      case "ver":
        say({ text: ` ${labels.version}` });
        return;
      case "exit":
      case "quit":
        close();
        return;
      case "lang": {
        if (!languages[argument]) break;
        setLines((current) => [...current, echo]);
        go(
          `/${argument}${pathname.replace(/^\/[^/]+/, "")}`,
          ` ${labels.switching.replace("{language}", languages[argument])}`,
        );
        return;
      }
      case "cd":
        if (argument === "\\" || argument === ".." || argument === "/") {
          setLines((current) => [...current, echo]);
          go(homeHref, " A:\\");
          return;
        }
        break;
    }

    if (word === "type") {
      const file = find(argument);
      if (file) {
        say(
          ...file.content.map((text) => ({ text, indent: true })),
          { text: "" },
          { text: labels.tip.replace("{file}", base(file.name)), dim: true, indent: true },
        );
        return;
      }
      say({ text: ` ${labels.unknown}` });
      return;
    }

    const file = ["open", "cd", "start"].includes(word) ? find(argument) : find(command);
    if (file) {
      setLines((current) => [...current, echo]);
      go(file.href, ` ${labels.opening.replace("{file}", file.name)}`);
      return;
    }
    say({ text: ` ${labels.unknown}` });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    run(value);
    setValue("");
  }

  function onInputKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") return close();
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const step = event.key === "ArrowUp" ? -1 : 1;
    historyIndex.current = Math.min(Math.max(historyIndex.current + step, 0), history.current.length);
    setValue(history.current[historyIndex.current] ?? "");
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={labels.label}
      className="absolute inset-0 z-20 flex animate-insert flex-col bg-label ruled px-[max(1rem,5cqw)] py-[max(0.5rem,2.8cqw)] font-terminal text-[max(1.0625rem,3.4cqw)] text-ink"
    >
      <div
        ref={screen}
        aria-live="polite"
        className="min-h-0 flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-rule)_transparent] overflow-y-auto"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap ${line.dim ? "text-pencil" : ""} ${line.indent ? "pl-[1ch]" : ""}`}
          >
            {line.text || "\u00a0"}
          </p>
        ))}
        <form onSubmit={submit} className="flex">
          <label htmlFor="prompt-input" className="shrink-0 whitespace-pre">
            {"A:\\> "}
          </label>
          <input
            id="prompt-input"
            ref={input}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onInputKey}
            aria-label={labels.input}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent caret-ink outline-none"
          />
        </form>
      </div>
      <p className="flex items-center justify-between font-mono text-[max(0.625rem,1.8cqw)] tracking-[0.08em] text-pencil uppercase">
        <span>{labels.hint}</span>
        <button type="button" onClick={close} className="min-h-11 hover:text-ink">
          {labels.close}
        </button>
      </p>
    </div>
  );
}

/** The menu bar's way in, so the prompt works without a keyboard too. */
export function PromptButton({
  label,
  className = "flex h-full items-center px-1 hover:underline",
  children = "A:\\>",
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={`${label} ( / )`}
      onClick={() => window.dispatchEvent(new Event(OPEN_PROMPT_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}

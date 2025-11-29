"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";

type Props = {
  value?: string[];
  suggestions?: string[];
  onChange?: (items: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  maxLength?: number;
};

export default function TagInput({
  value = [],
  suggestions = [],
  onChange,
  placeholder = "Add inspiration and press Enter",
  maxItems = 20,
  maxLength = 64,
}: Props) {
  const [items, setItems] = useState<string[]>(value);
  const [input, setInput] = useState("");

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  function pushItem(raw: string) {
    const v = raw.trim();
    if (!v) return;
    if (v.length > maxLength) return;
    if (items.some((i) => i.toLowerCase() === v.toLowerCase())) return;
    if (items.length >= maxItems) return;
    const next = [...items, v];
    setItems(next);
    onChange?.(next);
    setInput("");
  }

  function removeIndex(idx: number) {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange?.(next);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      pushItem(input);
    } else if (e.key === "Backspace" && !input && items.length) {
      removeIndex(items.length - 1);
    }
  }

  return (
    <div>
      <div className="min-h-[44px] flex items-center flex-wrap gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-700">
        {items.map((it, i) => (
          <span key={it + i} className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <span>{it}</span>
            <button type="button" onClick={() => removeIndex(i)} className="text-sm opacity-70 hover:opacity-100">×</button>
          </span>
        ))}

        <input
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 min-w-[120px] h-10 px-2 bg-transparent outline-none"
          aria-label="Add inspiration"
        />
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pushItem(s)}
              className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

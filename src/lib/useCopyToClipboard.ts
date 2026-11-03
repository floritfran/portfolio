"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeout.current) {
          window.clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => setCopied(false), resetMs);
      } catch {
        window.location.href = `mailto:${text}`;
      }
    },
    [resetMs],
  );

  return { copied, copy };
}

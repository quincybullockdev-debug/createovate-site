"use client";

import { useState } from "react";

// An email address that opens your mail app, plus a button that copies it.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (rare): the mail link still works.
    }
  }

  return (
    <span className="email">
      <a className="email__link" href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className="email__copy" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

"use client";

import React, { useState } from "react";
import { FileText, Save, CheckCircle2 } from "lucide-react";

export default function CMSEditorAdminPage() {
  const [selectedDoc, setSelectedDoc] = useState("privacy");
  const [content, setContent] = useState(
    "Doom OTT Privacy Policy: We respect user data encryption standards. No third-party ad tracking."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="font-display font-black uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
            CMS Static Page Editor
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Edit live legal documents, Privacy Policy, Terms of Service, and Help center texts.
          </p>
        </div>

        <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--accent-main)] text-[var(--accent-foreground)] font-display text-xs uppercase font-extrabold cursor-pointer">
          <Save className="w-4 h-4" /> Publish CMS Updates
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Legal document published to consumer site!
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {["privacy", "terms", "faq", "about"].map((doc) => (
            <button
              key={doc}
              onClick={() => setSelectedDoc(doc)}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${selectedDoc === doc ? "bg-[var(--accent-main)] text-[var(--accent-foreground)]" : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)]"}`}
            >
              {doc} Page
            </button>
          ))}
        </div>

        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-xs text-[var(--foreground)] font-mono leading-relaxed focus:outline-none focus:border-[var(--accent-main)]"
        />
      </div>
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import {
  CodeViewerDialog,
  type CodeViewerPayload,
  useCodeBlockEnhancer,
} from "./code-viewer";

type PostContentProps = {
  html: string;
};

export function PostContent({ html }: PostContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<CodeViewerPayload | null>(null);

  const onExpand = useCallback((payload: CodeViewerPayload) => {
    setViewer(payload);
  }, []);

  useCodeBlockEnhancer(ref, onExpand, [html]);

  return (
    <>
      <div
        ref={ref}
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {viewer && (
        <CodeViewerDialog
          open
          onClose={() => setViewer(null)}
          language={viewer.language}
          filename={viewer.filename}
          codeText={viewer.codeText}
          codeHtml={viewer.codeHtml}
        />
      )}
    </>
  );
}

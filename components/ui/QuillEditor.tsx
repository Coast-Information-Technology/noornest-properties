"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

// Use Quill directly instead of react-quill for React 19 compatibility
const QuillEditorComponent = dynamic(
  () => import("./QuillEditorClient"),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border border-gray-300 rounded-md p-4 bg-white">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    ),
  }
);

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder = "Describe the property in detail...",
  className = "",
}: QuillEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editorIdRef = useRef(`quill-editor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`quill-editor ${className}`}>
        <div className="min-h-[200px] border border-gray-300 rounded-md p-4 bg-white">
          <div className="text-gray-500">{placeholder}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`quill-editor-wrapper ${className}`} data-editor-id={editorIdRef.current}>
      <QuillEditorComponent
        key={editorIdRef.current}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .quill-editor-wrapper .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 200px;
        }
        .quill-editor-wrapper .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        .quill-editor-wrapper .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 0.375rem 0.375rem;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}

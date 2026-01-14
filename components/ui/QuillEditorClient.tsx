"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";

interface QuillEditorClientProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Global registry to track initialized Quill instances
const quillInstances = new WeakMap<HTMLElement, Quill>();

export default function QuillEditorClient({
  value,
  onChange,
  placeholder = "Describe the property in detail...",
}: QuillEditorClientProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    // Multiple guards to prevent duplicate initialization
    if (!editorRef.current) return;
    if (quillRef.current) return;
    if (isInitializingRef.current) return;
    
    // Check global registry
    if (quillInstances.has(editorRef.current)) {
      quillRef.current = quillInstances.get(editorRef.current) || null;
      return;
    }
    
    // Check if this element already has Quill initialized (using data attribute)
    if (editorRef.current.hasAttribute("data-quill-initialized")) {
      return;
    }
    
    // Check if Quill is already initialized on this element
    if (editorRef.current.querySelector(".ql-toolbar")) {
      return;
    }

    isInitializingRef.current = true;

    // Clear any existing content
    editorRef.current.innerHTML = "";

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "image"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      },
      formats: [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "indent",
        "align",
        "link",
        "image",
        "color",
        "background",
      ],
    });

    quillRef.current = quill;
    isInitializingRef.current = false;
    
    // Register in global registry
    quillInstances.set(editorRef.current, quill);
    
    // Mark as initialized
    editorRef.current.setAttribute("data-quill-initialized", "true");

    // Set initial value
    if (value) {
      quill.root.innerHTML = value;
    }

    // Handle text changes
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      if (html !== value) {
        onChange(html);
      }
    });

    return () => {
      if (quillRef.current && editorRef.current) {
        quillRef.current.off("text-change");
        // Remove from global registry
        quillInstances.delete(editorRef.current);
        // Destroy the Quill instance
        const element = quillRef.current.root.parentElement;
        if (element) {
          element.innerHTML = "";
        }
        editorRef.current.removeAttribute("data-quill-initialized");
        quillRef.current = null;
        isInitializingRef.current = false;
      }
    };
  }, []);

  // Update content when value prop changes externally (but not from user input)
  useEffect(() => {
    if (quillRef.current) {
      const currentContent = quillRef.current.root.innerHTML;
      // Only update if the value is different and not just whitespace differences
      if (value !== currentContent && value.trim() !== currentContent.trim()) {
        const selection = quillRef.current.getSelection();
        quillRef.current.root.innerHTML = value;
        // Restore selection if it existed
        if (selection) {
          quillRef.current.setSelection(selection);
        }
      }
    }
  }, [value]);

  return <div ref={editorRef} className="min-h-[200px]" />;
}

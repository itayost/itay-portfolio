//src/components/SkipToContent.tsx
"use client";
import { useState } from "react";

export default function SkipToContent() {
  const [focused, setFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-4 z-[60] px-4 py-2 bg-blue-600 text-white rounded-md
        transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${focused ? 'translate-x-0' : '-translate-x-full'}
      `}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      Skip to main content
    </a>
  );
}
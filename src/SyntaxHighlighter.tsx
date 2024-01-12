import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/themes/prism.css";
import "./CodeEditor.css";

const SyntaxHighlighter: React.FC = () => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const resultElementRef = useRef<HTMLPreElement>(null);
  const textAreaElementRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [highlightedCode]);
  // Function to update the highlighted code when the textarea content changes
  function update(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const updatedCode = e.target.value
      .replace(new RegExp("&", "g"), "&amp;")
      .replace(new RegExp("<", "g"), "&lt;");
    setHighlightedCode(updatedCode);
  }
  // Function to synchronize the scrolling of the textarea and result elements
  function handleScroll() {
    // Use refs to access the result and textarea elements
    const resultElement = resultElementRef.current;
    const textAreaElement = textAreaElementRef.current;

    if (resultElement && textAreaElement) {
      // Synchronize the scroll positions of the result and textarea elements
      resultElement.scrollTop = textAreaElement.scrollTop;
      resultElement.scrollLeft = textAreaElement.scrollLeft;
    }
  }

  return (
    <div className="main">
      <h1>Simple Code Editor</h1>
      <div className="window">
        <div className="window-header">
          <div className="action-buttons"></div>
        </div>
        <div className="window-body">
          {/* Textarea for code input */}
          <textarea
            ref={textAreaElementRef}
            className="code-input"
            spellCheck={false}
            onChange={update}
            onScroll={handleScroll}
          ></textarea>
          {/* Pre element for displaying highlighted code output */}
          <pre
            ref={resultElementRef}
            aria-hidden="true"
            className="language-javascript code-output"
          >
            <code className="language-javascript" id="highlighting-content">
              {highlightedCode}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SyntaxHighlighter;

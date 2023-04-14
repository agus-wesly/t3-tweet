import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState } from "react";

type Props = {
  onSave: ({ content }: { content: string }) => void;
};

function TextEditor({ onSave }: Props) {
  const [input, setInput] = useState("");

  const handleCreate = () => {
    onSave({
      content: input,
    });
    setInput("");
  };

  return (
    <>
      <CodeMirror
        value={input}
        width="100%"
        height="60vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={(newInput) => setInput(newInput)}
      />
      <button
        disabled={!input}
        onClick={handleCreate}
        className="btn-success btn"
      >
        Create
      </button>
    </>
  );
}

export default TextEditor;

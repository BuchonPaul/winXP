import { useState } from "react";
import { useAppContext } from "../../../data/WindowsContext.jsx";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { WordMenu } from "./wordMenu/WordMenu.jsx";
import { SaveModal } from "./wordModal/SaveModal.jsx";
import Document from "@tiptap/extension-document";
import FontFamily from "@tiptap/extension-font-family";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyleExtended } from "./wordFunction/FontSize";
import "./Word.css";

const extensions = [
  Document,
  Paragraph,
  Text,
  TextStyle,
  FontFamily,
  TextStyleExtended,
  Color,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function Word({ cfg }) {
  const [content, setContent] = useState(cfg.description);
  const [showSave, setShowSave] = useState(false);
  const [title, setTitle] = useState(cfg.title);
  const { saveNodeById } = useAppContext();

  const saveChanges = () => {
    console.log(content);
    saveNodeById(cfg.id, title, content);
    setShowSave(false);
  };
  const toogleShowSave = () => {
    setShowSave(true);
  };
  return (
    <div className="wordContainer">
      <SaveModal
        title={title}
        setTitle={setTitle}
        showSave={showSave}
        setShowSave={setShowSave}
        saveChanges={saveChanges}
      />
      <EditorProvider
        slotBefore={
          <WordMenu setContent={setContent} saveChanges={toogleShowSave} />
        }
        extensions={extensions}
        content={content}
      />
    </div>
  );
}

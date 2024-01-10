import { useState } from "react";
import { useAppContext } from "../../../data/WindowsContext.jsx";
import "./NotePad.css";

export default function NotePad({ cfg }) {
  const [title, setTitle] = useState(cfg.title);
  const [desc, setDesc] = useState(cfg.description);
  const { saveNodeById } = useAppContext();
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescChange = (e) => {
    setDesc(e.target.value);
  };
  const saveChanges = () => {
    saveNodeById(cfg.id, title, desc);
  };

  return (
    <div className="teContainer">
      <div className="toolBar">
        <div className="toolButton" onClick={saveChanges} placeholder="Title">
          Sauver
        </div>
      </div>
      <input
        type="text"
        className="titInput"
        onChange={onTitleChange}
        value={title}
      />
      <textarea
        className="descInput"
        onChange={onDescChange}
        value={desc}
        placeholder="Write your notes here."
      />
    </div>
  );
}

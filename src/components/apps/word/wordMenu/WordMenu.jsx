import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import "./WordMenu.css";

export const WordMenu = ({ setContent, saveChanges }) => {
  const { editor } = useCurrentEditor();
  const [selectedfont, setSelectedfont] = useState("");
  const [selectedfontSize, setSelectedfontSize] = useState("16");
  const [color, setColor] = useState("black");

  const mouseClickEvents = ["mousedown", "click", "mouseup"];
  function simulateMouseClick(element) {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    );
  }
  useEffect(() => {
    const handleTextInput = () => {
      setContent(editor.getHTML());
    };
    editor.on("update", handleTextInput);
    return () => {
      editor.off("update", handleTextInput);
    };
  }, [editor, setContent]);

  return (
    <div className="wordMenu">
      <div className="wordToolBar tools">
        <button className="marg" onClick={() => saveChanges()}>
          <img src="./wordIcon/save.png" />
        </button>
        <div className="section">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <img src="./wordIcon/undo.png" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <img src="./wordIcon/redo.png" />
          </button>
        </div>
      </div>
      <div className="wordToolBar tools">
        <select
          onChange={(e) => {
            editor.chain().focus().setFontFamily(e.target.value).run();
            setSelectedfont(e.target.value);
          }}
          className={
            editor.isActive("textStyle", { fontFamily: selectedfont })
              ? "styled-select is-active"
              : "styled-select"
          }
        >
          <option value="Arial">Arial</option>
          <option value="Inter">Inter</option>
          <option value="Comic Sans MS, Comic Sans">Comic Sans MS</option>
          <option value="monospace">monospace</option>
          <option value="cursive">cursive</option>
          <option value="serif">serif</option>
        </select>
        <select
          className="styled-select"
          onChange={(e) => {
            editor.commands.setFontSize(e.target.value);
            setSelectedfontSize(e.target.value);
          }}
          value={selectedfontSize}
        >
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(
            (element) => {
              return (
                <option key={element} value={element}>
                  {element}
                </option>
              );
            }
          )}
        </select>
        <div className="section">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <img src="./wordIcon/bold.png" />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <img src="./wordIcon/italic.png" />
          </button>
        </div>
        <div className="section">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <img src="./wordIcon/left.png" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <img src="./wordIcon/center.png" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <img src="./wordIcon/right.png" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            <img src="./wordIcon/justify.png" />
          </button>
          <button
            onClick={() =>
              simulateMouseClick(document.querySelector("#chooseColor"))
            }
          >
            <svg width="90%" height="90%" viewBox="0 0 13 12">
              <g transform="matrix(1,0,0,1,-1318.44,-1767.41)">
                <g transform="matrix(1.11692,0,0,1.09276,-203.614,-298.028)">
                  <clipPath id="_clip1">
                    <rect
                      x="1362.66"
                      y="1890.15"
                      width="11.466"
                      height="10.348"
                    />
                  </clipPath>
                  <g clipPath="url(#_clip1)">
                    <path
                      d="M1368.74,1890.11L1369.12,1890.11C1369.68,1891.04 1370.43,1892.63 1371.37,1894.89C1371.97,1896.33 1372.39,1897.22 1372.63,1897.55C1372.87,1897.87 1373.28,1898.06 1373.86,1898.09C1374.04,1898.11 1374.13,1898.15 1374.13,1898.23C1374.12,1898.28 1374.07,1898.31 1373.98,1898.31L1373.86,1898.31C1373.35,1898.27 1372.7,1898.26 1371.91,1898.26C1370.69,1898.26 1369.91,1898.27 1369.57,1898.3C1369.39,1898.3 1369.31,1898.26 1369.31,1898.19C1369.32,1898.14 1369.38,1898.11 1369.51,1898.09C1369.99,1898.06 1370.32,1898 1370.51,1897.92C1370.69,1897.83 1370.8,1897.7 1370.81,1897.51C1370.82,1897.34 1370.68,1896.9 1370.39,1896.2L1369.97,1895.15C1369.68,1895.15 1368.38,1895.16 1366.08,1895.19C1365.42,1896.31 1365.08,1897.03 1365.06,1897.32C1365.04,1897.57 1365.17,1897.75 1365.45,1897.88C1365.73,1898 1366.01,1898.06 1366.29,1898.07C1366.49,1898.09 1366.59,1898.13 1366.59,1898.21C1366.58,1898.24 1366.55,1898.27 1366.48,1898.3C1365.59,1898.27 1365.05,1898.26 1364.87,1898.26C1363.93,1898.26 1363.3,1898.27 1362.98,1898.28C1362.8,1898.28 1362.71,1898.25 1362.72,1898.17C1362.72,1898.11 1362.8,1898.07 1362.96,1898.05C1363.61,1897.99 1364.12,1897.67 1364.5,1897.1C1364.88,1896.52 1365.48,1895.49 1366.3,1894C1367.06,1892.65 1367.87,1891.35 1368.74,1890.11ZM1368.31,1891.44C1367.74,1892.21 1367.05,1893.34 1366.26,1894.81C1366.83,1894.79 1367.25,1894.78 1367.5,1894.78L1369.84,1894.81C1369.67,1894.39 1369.42,1893.82 1369.09,1893.12C1368.7,1892.29 1368.43,1891.73 1368.31,1891.44Z"
                      style={{ fill: "rgb(35,31,32)", fillRule: "nonzero" }}
                    />
                  </g>
                </g>
                <g transform="matrix(6.05634,0,0,1,-6620.57,-20.1916)">
                  <path
                    style={{ fill: color, fillRule: "nonzero" }}
                    d="M1312.96,1797.55C1312.96,1797.44 1312.95,1797.35 1312.93,1797.35L1310.89,1797.35C1310.88,1797.35 1310.86,1797.44 1310.86,1797.55L1310.86,1799.59C1310.86,1799.7 1310.88,1799.79 1310.89,1799.79L1312.93,1799.79C1312.95,1799.79 1312.96,1799.7 1312.96,1799.59L1312.96,1797.55Z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div className="section">
          <input
            id="chooseColor"
            type="color"
            onInput={(event) => {
              editor.chain().focus().setColor(event.target.value).run();
              setColor(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

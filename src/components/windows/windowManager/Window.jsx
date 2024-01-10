import { useState, useRef } from "react";
import "./Window.css";
import Word from "../../apps/word/Word.jsx";
import NotePad from "../../apps/notepad/NotePad.jsx";
import Basket from "../../apps/basket/Basket.jsx";
import Internet from "../../apps/internet/Internet.jsx";
import { useAppContext } from "../../../data/WindowsContext.jsx";

export default function Window({ cfg }) {
  const [posX, setPosX] = useState(10);
  const [posY, setPosY] = useState(10);
  const { closeWindow, toogleWindow } = useAppContext();
  const posXMouse = useRef(0);
  const posYMouse = useRef(0);

  const handleMouseDown = (e) => {
    posXMouse.current = e.clientX - posX;
    posYMouse.current = e.clientY - posY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setPosX(e.clientX - posXMouse.current);
    setPosY(e.clientY - posYMouse.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className="windowContainer"
      style={{
        top: `${posY}px`,
        left: `${posX}px`,
        //display: cfg.isShow ? "flex" : "none",
        transform: !cfg.isShow
          ? `scale(0, 1) translate(0px, 1000px)`
          : "scale(1, 1)",
        transition: "transform 0.3s",
      }}
    >
      <div className="windowHeader"></div>
      <header
        className="windowHeaderContent"
        onMouseDown={(e) => {
          e.preventDefault();
          handleMouseDown(e);
        }}
      >
        <img className="windowLogo" src={cfg.icon} />
        <div className="windowTitle">{cfg.title}</div>
        <div className="windowTools">
          <button
            className="windowRed"
            onClick={() => {
              toogleWindow(cfg.id);
            }}
          ></button>
          <button className="windowAug"></button>
          <button
            className="windowQuit"
            onClick={() => closeWindow(cfg.id)}
          ></button>
        </div>
      </header>
      <div className="windowContent">
        {cfg.windowType === "NotePad" ? (
          <NotePad cfg={cfg} />
        ) : cfg.windowType === "Word" ? (
          <Word cfg={cfg} />
        ) : cfg.windowType === "Basket" ? (
          <Basket cfg={cfg} />
        ) : (
          <Internet cfg={cfg} />
        )}
      </div>
    </div>
  );
}

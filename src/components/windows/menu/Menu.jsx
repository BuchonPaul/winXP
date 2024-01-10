import "./Menu.css";
import { useAppContext } from "../../../data/WindowsContext.jsx";

export default function Menu({ menuOpen }) {
  const { openWindow, addNode } = useAppContext();

  const toogleCorbeille = () => {
    openWindow("internet");
  };

  const toogleasket = () => {
    openWindow("basket");
  };

  const handleAppNode = async (e, type) => {
    await addNode({ posX: e.x, posY: e.y, type: type });
  };

  if (menuOpen) {
    return (
      <div className="MenuContainer">
        <div className="winHeader"></div>
        <div className="winButtons">
          <hr className="orange-hr" />
          <div className="appButtons">
            <div className="menuApp" onClick={toogleCorbeille}>
              <img src="./internet.png" />
              <div>
                <h4>Internet</h4>
                <p>Internet Explorer</p>
              </div>
            </div>
            <div className="menuApp" onClick={toogleasket}>
              <img src="./basket.png" />
              <div>
                <h4>Corbeille</h4>
                <p>Corbeille</p>
              </div>
            </div>
          </div>
          <div className="fileButton">
            <div
              className="actionButton"
              onClick={(e) => {
                handleAppNode(e, "word-node");
              }}
            >
              <img src="./word.png" />
              <h3>Word</h3>
            </div>
            <div
              className="actionButton"
              onClick={(e) => {
                handleAppNode(e, "text-node");
              }}
            >
              <img src="./notepad.png" />
              <h3>Bloc-notes</h3>
            </div>
          </div>
        </div>
        <footer></footer>
      </div>
    );
  }
}

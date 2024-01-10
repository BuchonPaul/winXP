import { useState } from "react";
import { useAppContext } from "../../../data/WindowsContext.jsx";
import "./Basket.css";

export default function Basket() {
  const [selectedSupNode, setSelectedSupNode] = useState([]);
  const { restoreNodes, deletedNode, setDeletedNode } = useAppContext();

  const clearBasket = () => {
    setDeletedNode([]);
    setSelectedSupNode([]);
  };

  const toogleRestoreNodes = async () => {
    selectedSupNode.forEach((element) => {
      restoreNodes(deletedNode.find((item) => item.id === element));
    });
    const newDeletedNodeList = await deletedNode.filter((item) => {
      return !selectedSupNode.includes(item.id);
    });
    setDeletedNode(newDeletedNodeList);

    setSelectedSupNode([]);
  };
  const toogleSupCard = (id) => {
    if (selectedSupNode.includes(id)) {
      const newList = selectedSupNode.filter((element) => {
        return element != id;
      });
      setSelectedSupNode(newList);
    } else {
      setSelectedSupNode((prev) => [...prev, id]);
    }
  };

  return (
    <div className="basketContainer">
      <div className="basketMenu">
        <button
          className={selectedSupNode.length == 0 ? "disabled" : 0}
          onClick={toogleRestoreNodes}
        >
          <img src="./basketIcon/ret.png" />
          <p>Restaurer {selectedSupNode.length} Document(s)</p>
        </button>
        <button
          className={deletedNode.length == 0 ? "disabled" : 0}
          onClick={clearBasket}
        >
          <img src="./basket.png" />
          <p>Vider la corbeille</p>
        </button>
      </div>
      <div className="cardContainer">
        {deletedNode.map((item) => {
          return (
            <div
              className={
                selectedSupNode.includes(item.id)
                  ? "supCard selected"
                  : "supCard"
              }
              onClick={() => toogleSupCard(item.id)}
              key={item.id}
            >
              <img src={"./" + item.model.icon} />
              <div className="desc">
                <h6>{item.model.title}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

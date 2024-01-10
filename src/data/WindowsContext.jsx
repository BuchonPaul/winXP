import { createContext, useContext, useState, useEffect, useRef } from "react";
import { data } from "./data.js";
import "../nodes/WinNode.jsx";

export const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [nodeIndex, setNodeIndex] = useState(6);
  const graphData = data;
  const [edtionMode, setEdtionMode] = useState(false);
  const [editedNode, setEditedNode] = useState();
  const [windows, setWindows] = useState([]);
  const [deletedNode, setDeletedNode] = useState([]);

  const prevSelectedNode = useRef(null);
  const containerRef = useRef(null);
  const graphRef = useRef(null);

  useEffect(() => {
    if (prevSelectedNode.current) {
      const node = graphRef.current.findById(prevSelectedNode.current);
      node.update({ selected: false });
      node.refresh();
    }
    if (editedNode) {
      setEdtionMode(true);
      const node = graphRef.current.findById(editedNode);
      node.update({ selected: true });
      node.refresh();
    } else {
      setEdtionMode(false);
    }
    prevSelectedNode.current = editedNode;
  }, [editedNode]);

  const createNode = async ({
    posX = 100,
    posY = 100,
    type = "default-node",
  }) => {
    setNodeIndex((n) => n + 1);
    let newNode = {
      id: "node" + nodeIndex,
      x: posX,
      y: posY,
      icon: "notepad.png",
    };
    if (type === "default-node") {
      newNode = { ...newNode };
    } else if (type === "word-node") {
      newNode = {
        ...newNode,
        type: "win-node",
        title: "Nouveau Document",
        description: "Votre description",
        icon: "word.png",
        windowType: "Word",
      };
    } else if (type === "text-node") {
      newNode = {
        ...newNode,
        type: "win-node",
        title: "Votre titre",
        description: "Votre description",
        icon: "notepad.png",
        windowType: "NotePad",
      };
    }
    return newNode;
  };

  const openWindow = async (id) => {
    if (
      windows.filter((element) => {
        return element.id == id;
      }).length === 0
    ) {
      let windowedNode = graphRef.current.findById(id);
      let newNode = {
        id: id,
        windowType: windowedNode._cfg.model.windowType,
        isShow: true,
        title: windowedNode._cfg.model.title,
        description: windowedNode._cfg.model.description,
        icon: windowedNode._cfg.model.icon,
      };
      setWindows([...windows, newNode]);
    } else {
      toogleWindow(id);
    }
  };
  const closeWindow = (winId) => {
    const newList = windows.filter((element) => {
      return element.id != winId;
    });
    setWindows(newList);
  };

  const toogleWindow = (winId) => {
    setWindows((prevWindows) =>
      prevWindows.map((element) =>
        element.id === winId ? { ...element, isShow: !element.isShow } : element
      )
    );
  };
  const saveNodeById = (id, title, desc) => {
    const node = graphRef.current.findById(id);
    node.update({ description: desc, title: title });
    node.refresh();
  };
  const restoreNodes = (node) => {
    node.model.selected = false;
    graphRef.current.addItem("node", node.model);
  };

  const addNode = async (params) => {
    const newNode = await createNode(params);
    graphRef.current.addItem("node", newNode);
    graphRef.current.layout();
    openWindow(newNode.id);
  };

  const deleteNode = async () => {
    new Promise((resolve, reject) => {
      const rmNode = graphRef.current.findById(editedNode);
      if (
        rmNode._cfg.model.windowType == "Word" ||
        rmNode._cfg.model.windowType == "NotePad"
      ) {
        setDeletedNode((prev) => [...prev, rmNode._cfg]);
        resolve(rmNode);
      } else {
        reject();
      }
    }).then(
      (resolve) => {
        if (resolve !== null) {
          graphRef.current.removeItem(resolve);
          prevSelectedNode.current = undefined;
          setEditedNode(undefined);
        }
      },
      () => {}
    );
  };

  const value = {
    graphData,
    edtionMode,
    editedNode,
    addNode,
    deleteNode,
    containerRef,
    graphRef,
    setEdtionMode,
    setEditedNode,
    windows,
    setWindows,
    openWindow,
    saveNodeById,
    closeWindow,
    toogleWindow,
    deletedNode,
    setDeletedNode,
    restoreNodes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

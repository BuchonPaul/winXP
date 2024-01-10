import { useEffect, useState } from "react";
import { useAppContext } from "../../../data/WindowsContext.jsx";
import G6 from "@antv/g6";
import Window from "../windowManager/Window.jsx";
export default function Desktop({
  graphData,
  addNode,
  setEditedNode,
  edtionMode,
  openWindow,
  menuOpen,
  setMenuOpen,
  deleteNode,
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { containerRef, graphRef, windows, editedNode } = useAppContext();

  useEffect(() => {
    const initializeGraph = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      if (containerWidth !== width || containerHeight !== height) {
        setWidth(containerWidth);
        setHeight(containerHeight);

        if (graphRef.current) {
          graphRef.current.changeSize(containerWidth, containerHeight);
        } else {
          graphRef.current = new G6.Graph({
            container: containerRef.current,
            width: containerWidth,
            height: containerHeight,
            layout: {
              type: "grid",
              begin: [0, 0],
              rows: 10,
              cols: 10,
              sortBy: "degree",
            },
            modes: {
              default: ["drag-node"],
            },
            defaultNode: {
              style: {},
            },
          });
          graphRef.current.data(graphData);
          graphRef.current.render();
        }
      }
    };

    initializeGraph();
    const handleResize = () => {
      initializeGraph();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height, graphRef, containerRef, graphData]);

  useEffect(() => {
    const handleDesktopDblClick = async (e) => {
      await addNode({ posX: e.x, posY: e.y, type: "word-node" });
    };
    const handleNodeClick = (e) => {
      setEditedNode(e.item._cfg.id);
    };

    const handleDesktopClick = () => {
      setEditedNode();
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    const handleNodeDblClick = (e) => {
      openWindow(e.item._cfg.id);
    };
    const handleKeyPressed = (e) => {
      if (e.target.nodeName == "BODY") {
        if (e.key == "Delete" || e.key == "Backspace") {
          deleteNode(editedNode);
        }
      }
    };

    graphRef.current.on("canvas:dblclick", handleDesktopDblClick);
    graphRef.current.on("node:dblclick", handleNodeDblClick);
    graphRef.current.on("node:click", handleNodeClick);
    graphRef.current.on("canvas:click", handleDesktopClick);
    graphRef.current.on("keydown", handleKeyPressed);

    return () => {
      graphRef.current.off("canvas:dblclick", handleDesktopDblClick);
      graphRef.current.off("node:dblclick", handleNodeDblClick);
      graphRef.current.off("node:click", handleNodeClick);
      graphRef.current.off("canvas:click", handleDesktopClick);
      graphRef.current.off("keydown", handleKeyPressed);
    };
  }, [
    addNode,
    openWindow,
    edtionMode,
    graphData,
    graphRef,
    setEditedNode,
    windows,
    menuOpen,
    setMenuOpen,
    deleteNode,
    editedNode,
  ]);

  return (
    <>
      {windows.map((item) => {
        return <Window key={item.id} cfg={item} />;
      })}
      <div
        className="desktopContainer"
        ref={containerRef}
        style={{ width: "100%", height: "100vh", background: "#f5ebe0" }}
      />
    </>
  );
}

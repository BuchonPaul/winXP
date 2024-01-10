import { Flex } from "@radix-ui/themes";
import "./App.css";
import Desktop from "./components/windows/desktop/Desktop.jsx";
import Footer from "./components//windows/footer/Footer.jsx";
import { useAppContext } from "./data/WindowsContext.jsx";
import { useState } from "react";

function App() {
  const {
    graphData,
    edtionMode,
    editedNode,
    setEditedNode,
    addNode,
    deleteNode,
    openWindow,
  } = useAppContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const toogleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Flex direction="column" gap="0">
        <Desktop
          graphData={graphData}
          addNode={addNode}
          setEditedNode={setEditedNode}
          edtionMode={edtionMode}
          editedNode={editedNode}
          openWindow={openWindow}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          deleteNode={deleteNode}
        />
      </Flex>
      <Footer toogleMenu={toogleMenu} menuOpen={menuOpen} />
    </>
  );
}

export default App;

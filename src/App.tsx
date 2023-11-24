import { background } from "@/styles";
import ButtonsDisplayBox from "@/Components/ButtonsDisplayBox";
import ColorPickers from "@/Components/ColorPickers";
import React from "react";
import StorageLoadAskModal from "@/Components/StorageLoadAskModal";

function App() {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const buttonsData = localStorage.getItem("buttonsData");
    if (buttonsData) {
      setModalOpen(true);
    }
  }, []);

  return (
    <div style={background}>
      <h1 style={{ color: "#333333" }}>Color Buttons</h1>
      <StorageLoadAskModal open={modalOpen} setOpen={setModalOpen} />
      <ButtonsDisplayBox />
      <ColorPickers />
    </div>
  );
}

export default App;

import { background } from "@/styles";
import ButtonsDisplayBox from "@/Components/ButtonsDisplayBox";
import ColorPickers from "@/Components/ColorPickers";
import React from "react";
import StrageLoadAskModal from "./Components/StrageLoadAskModal";

function App() {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const buttonsData = localStorage.getItem("buttonsData");
    if (buttonsData) {
      setModalOpen(true);
      console.log("ローカルストレージにデータがあります:", buttonsData);
    } else {
      console.log("ローカルストレージにデータはありません");
    }
  }, []);

  return (
    <div style={background}>
      <h1 style={{ color: "#333333" }}>Color Buttons</h1>
      <StrageLoadAskModal open={modalOpen} setOpen={setModalOpen} />
      <ButtonsDisplayBox />
      <ColorPickers />
    </div>
  );
}

export default App;

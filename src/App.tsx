import { background } from "@/styles";
import ButtonsDisplayBox from "@/Components/ButtonsDisplayBox";
import ColorPickers from "@/Components/ColorPickers";

function App() {
  return (
    <div style={background}>
      <h1 style={{ color: "#333333" }}>Color Buttons</h1>
      <ButtonsDisplayBox />
      <ColorPickers />
    </div>
  );
}

export default App;

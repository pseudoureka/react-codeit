import { useState } from "react";
import Button from "./Button";
import Dice from "./Dice";

function App() {
  const [num, setNum] = useState(1);

  const handleRollClick = () => {
    setNum(Math.floor(Math.random() * 6) + 1);
  };

  const handleClearClick = () => {
    setNum(1);
  };

  return (
    <>
      <div>
        <Button onClick={handleRollClick}>던지기</Button>
        <Button onClick={handleClearClick}>처음부터</Button>
      </div>
      <Dice color="blue" num={num} />
    </>
  );
}

export default App;

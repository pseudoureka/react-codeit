import Button from "./Button";
import Dice from "./Dice";

function App() {
  return (
    <>
      <div>
        <Button>던지기</Button>
        <Button>처음부터</Button>
      </div>
      <Dice color="blue" num={6} />
    </>
  );
}

export default App;

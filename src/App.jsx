import { useEffect, useState, useRef } from "react";
import style from "./App.module.css";

function App() {
  const [text, setText] = useState("");
  const [time, setTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const focusTextArea = useRef(0);

  const startGame = () => {
    setIsRunning(true);
    setCount(0);
    focusTextArea.current.disabled = false;
    focusTextArea.current.focus();
  };

  const wordCounter = (word) =>
    word.split(" ").filter((item) => item !== "").length;

  const endGame = () => {
    setIsRunning(false);
    setTime(5);
    setText("");
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      endGame();
    }
  }, [isRunning, time]);

  return (
    <div className={style.app}>
      <h1 className={style.title}>How fast do you type?</h1>
      <textarea
        className={style.textArea}
        disabled={!isRunning}
        value={text}
        ref={focusTextArea}
        onChange={(e) => {
          setText(e.target.value);
          setCount(wordCounter(text));
        }}
      />
      <h4 className={style.remaining}>Time remaining: {time}</h4>
      <button className={style.button} disabled={isRunning} onClick={startGame}>
        Start
      </button>
      <h2 className={style.count} onClick={() => setDisable((prev) => !prev)}>
        {count > 0 && `Word count: ${count}`}
      </h2>
    </div>
  );
}

export default App;

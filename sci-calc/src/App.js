import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";
import "./components/Screen.css";
import "./App.css";

const btnValues = [
  ["C", ",", "sin(", "ln2(", "%", "/"],
  [7, 8, 9, "cos(", "log10(", "*"],
  [4, 5, 6, "tan(", "l2e", "-"],
  [1, 2, 3, "sqrt(", "l10e", "+"],
  [0, "exp(", "E", "pi", ".", "="],
  ["(", ")"],
];

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const evaluateExpression = () => {
    try {
      if (input.includes("sqrt(")) {
        const expressionInsideSqrt = input.substring(
          input.indexOf("sqrt(") + 5,
          input.lastIndexOf(")")
        );
        setOutput(Math.sqrt(eval(expressionInsideSqrt)));
      } else if (input.includes("sin(")) {
        const expressionInsideSin = input.substring(
          input.indexOf("sin(") + 4,
          input.lastIndexOf(")")
        );
        setOutput(Math.sin((expressionInsideSin * Math.PI) / 180.0));
      } else if (input.includes("cos(")) {
        const expressionInsideCos = input.substring(
          input.indexOf("cos(") + 4,
          input.lastIndexOf(")")
        );
        setOutput(Math.cos(expressionInsideCos * Math.PI));
        if (output === 0) setOutput("0");
      } else if (input.includes("tan(")) {
        const expressionInsideTan = input.substring(
          input.indexOf("tan(") + 4,
          input.lastIndexOf(")")
        );
        setOutput(Math.tan(eval((expressionInsideTan * Math.PI) / 180.0)));
      } else if (input.includes("exp(")) {
        const expressionInsideExp = input.substring(
          input.indexOf("exp(") + 4,
          input.lastIndexOf(")")
        );
        setOutput(Math.exp(eval(expressionInsideExp)));
      } else if (input.includes("ln2(")) {
        const expressionInsideLog10 = input.substring(
          input.indexOf("ln2(") + 4,
          input.lastIndexOf(")")
        );
        setOutput(Math.log10(eval(expressionInsideLog10)));
      } else if (input.includes("log10(")) {
        const expressionInsideLog10 = input.substring(
          input.indexOf("log10(") + 6,
          input.lastIndexOf(")")
        );
        setOutput(Math.log10(eval(expressionInsideLog10)));
      } else if (input.includes("l2e")) {
        setOutput(eval(input.replace(/l2e/g, Math.log2(Math.E))));
      } else if (input.includes("l10e")) {
        setOutput(eval(input.replace(/pi/g, Math.log10(Math.E))));
      } else if (input.includes("pi")) {
        setOutput(eval(input.replace(/pi/g, Math.PI)));
      } else if (input.includes("E")) {
        setOutput(Math.E);
      } else {
        console.log(input);
        setOutput(JSON.stringify(eval(input)));
      }
    } catch (error) {
      setOutput("Error");
    }
  };

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
      setOutput("");
    } else if (value === "=") {
      evaluateExpression();
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };
  if (output === 0) setOutput("0");
  return (
    <div>
      <Wrapper>
        <Screen value={output ? output : input} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={() => {
                  handleButtonClick(btn);
                }}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;

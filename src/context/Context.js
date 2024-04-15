import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponseArray = "";
    responseArray.map((item, index) => {
      // if index is 0 or odd number then do nothing
      if (index === 0 || index % 2 !== 1) {
        newResponseArray += responseArray[index];
      }
      // if index is even then bold the text
      else {
        newResponseArray += "<b>" + responseArray[index] + "</b>";
      }
    });
    // create a new array from the old array and split the * from it and join them a line break
    let newResponseArray2 = newResponseArray.split("*").join("</br>");

    // setResultData(newResponseArray2);
    // ADD TYPING EFFECT
    // 1st we have to find each word so we have split this using space
    let finalResponseArray = newResponseArray2.split(" ");
    // after that we iterate over the array and add delayPara() function
    finalResponseArray.map((item, i) => {
      const nextWord = finalResponseArray[i];
      delayPara(i, nextWord + " ");
    });
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    // Inside this object if we write any variable or function that can use anywhere in our projetc component
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

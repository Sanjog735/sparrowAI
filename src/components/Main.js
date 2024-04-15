import React, { useContext, useState } from "react";
import { GiScoutShip } from "react-icons/gi";
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { Context } from "../context/Context";
import UserImg from "../assets/user_icon.png";

const Main = () => {
  const {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
  } = useContext(Context);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };
  const handleNewChat = () => {
    setShowResult(false);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      onSent();
    }
  };

  return (
    <div
      id="main"
      className=" min-h-[100vh] relativ flex flex-col bg-white dark:bg-[#151515] duration-200 "
    >
      <div id="navbar" className=" flex items-center justify-between p-5">
        <div
          id="logo-box"
          className=" flex items-center gap-1 cursor-pointer"
          title="Build by Sanjog Patel"
        >
          <GiScoutShip className=" mt-2 dark:text-white" />
          <p className=" text-[18px] sm:text-[22px] text-[#393838] dark:text-white">
            sparrowAI
          </p>
        </div>

        <div
          className=" cursor-pointer text-xl flex"
          onClick={handleDarkMode}
          title=" Toggle Mode"
        >
          {darkMode ? (
            <MdOutlineLightMode className=" text-white" />
          ) : (
            <MdDarkMode />
          )}
        </div>

        <div
          onClick={handleNewChat}
          title="New Chat"
          className=" flex items-center cursor-pointer gap-[5px] text-[18px] bg-[#e6eaf1] dark:bg-[#5e5e5f] rounded-full sm:rounded-[50px] px-[18px] py-[12px] text-gray-500"
        >
          <IoMdAdd className=" dark:text-[#e2dfdf]" />
          <p className=" hidden sm:block dark:text-[#e2dfdf]">New Chat</p>
        </div>
      </div>

      {!showResult ? (
        <>
          <div
            id=" content-box"
            className=" mt-[20vh]  max-w-[1200px] mx-auto flex flex-col px-1  "
          >
            <div id="greet" className="  text-[#c4c7c5] font-[500]">
              <p className=" text-center leading-none sm:leading-loose">
                <span className="bg-gradient-to-r from-[#609ef0] to-[#8d61d3] bg-clip-text text-transparent  text-[50px] sm:text-[56px] md:text-7xl ">
                  Hello Developer.
                </span>
              </p>
              <p className=" text-center leading-snug sm:leading-tight text-[40px] sm:text-[56px] md:text-7xl dark:text-[#5c5c5c]">
                How can i help you today?
              </p>
            </div>
          </div>
        </>
      ) : (
        <div
          id="result"
          className=" py-0 px-[8%] max-h-[70vh]  overflow-y-scroll "
        >
          <div
            id="result-title"
            className=" my-10 mx-0 flex items-center gap-5"
          >
            <img className=" w-[40px] rounded-full" src={UserImg} />
            <p className=" text-xl dark:text-white">{recentPrompt}</p>
          </div>
          <div id="result-date">
            {loading ? (
              <div id="loader" className=" w-full flex flex-col gap-2">
                <hr />
                <hr />
              </div>
            ) : (
              <p
                className=" text-black dark:text-[#b0b0b0] text-[17px] leading-[1.8] font-light"
                dangerouslySetInnerHTML={{ __html: resultData }}
              ></p>
            )}
          </div>
        </div>
      )}

      <div
        id="main-bottom"
        className=" absolute bottom-4 left-[50%] translate-x-[-50%]  w-full max-w-[900px] px-[20px] m-auto"
      >
        <div
          id="search-box"
          className=" w-full flex items-center justify-between gap-5 bg-[#f0f4f9] dark:bg-[#5e5e5f] dark:text-[#e2dfdf] rounded-[50px] py-[10px] sm:py-[15px] px-[8px] sm:px-[10px]"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={handleEnterKeyPress}
            className=" flex-1 bg-transparent border-none outline-none text-[15px] sm:text-lg mx-1 sm:mx-4"
            type="text"
            placeholder="Enter your prompt here"
            autoFocus
          />

          {input && (
            <IoMdSend
              onClick={() => onSent()}
              className=" cursor-pointer rounded-full "
              size={25}
            />
          )}
        </div>

        <p className=" my-[15px] text-center text-[#5d64ed]">
          Design and developement by Sanjog Patel
        </p>
      </div>
    </div>
  );
};

export default Main;

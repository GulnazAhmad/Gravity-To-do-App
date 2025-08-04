import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import Navbar from "../Components/Navbar";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "../utils";
import AddTask from "../Components/AddTask";
import TaskItem from "../Components/TaskItem";
import TaskList from "../Components/TaskList";
import { useLocation } from "react-router";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTask = queryParams.get("task") || ""; //Extracts the task value from the URL (e.g. ?task=hello).
  //console.log("user is", user);

  const fetchTasks = async () => {
    setLoader(true);
    try {
      const endpoint = searchTask
        ? `${URL}/api/searchtask?keyword=${searchTask}`
        : `${URL}/api/alltask`;
      const res = await axios.get(endpoint, {
        withCredentials: true,
      });
      //console.log("RETURNED DATA", res);
      setTasks(res.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchTask]);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/aa/d4/b3/aad4b34a21225637e3286be7a2058084.jpg')",
        }}
      >
        <Navbar />
        <div className="w-full h-full">
          {loader ? (
            <p>Loading tasks...</p>
          ) : !user ? (
            <div className="m-4 p-5 h-full flex-1 flex flex-col justify-center items-center transition-all duration-1000">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Lottie
                  isClickToPauseDisabled={true}
                  options={animationDefaultOptions}
                />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-shadow-black mt-4">
                Login/Register to start!
              </p>
            </div>
          ) : (
            <>
              <div>
                <AddTask onTaskAdded={fetchTasks} />
                <TaskList
                  tasks={tasks}
                  onRefresh={fetchTasks}
                  highlightText={searchTask}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

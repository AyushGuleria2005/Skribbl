import React, { useRef, useState } from "react";
import { io } from "socket.io-client";

const Main = () => {
  const [roomCode, setRoomCode] = useState("ABCDEF");
  const socketRef = useRef();
  const participantSocketRef = useRef();
  const [hostId,setHostId] = useState("");
  const [inputRoom,setInputRoom] = useState("");

  const generateCode = () => {
    const random = Math.floor(Math.random() * 1000000);
    setRoomCode(random);
    socketRef.current = io("http://localhost:7777");
    setHostId(socketRef.current.id);
    createRoom(random);   // call this function to create a room with the generated room ID
  };

  const createRoom = (code) => {
    // Send join-room event to the server
    socketRef.current.emit("join-room-host",code)
  }
  

  const joinHost = () => {
    if(roomCode === "ABCDEF"){
      console.log("Generate the code first")
    }
    else{
      console.log("Join the host");
      socketRef.current.emit("join-room",roomCode);
    }
  }

  const joinRoom = () => {
    participantSocketRef.current = io("http://localhost:7777");
    participantSocketRef.current.on("connect",()=>{
      console.log("Hello "+participantSocketRef.current.id)
    });
    participantSocketRef.current.emit("join-room-participant",inputRoom);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 flex flex-col items-center justify-center p-6">
      {/* Header Section - matching the image */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
          DrawSync Pro
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Ultra-premium collaborative drawing experience
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full">
          <span className="text-yellow-300 text-lg">✨</span>
          <span className="text-white font-medium">Premium Platform</span>
          <span className="text-pink-300 text-lg">🎨</span>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl">

        {/* Host Session Card */}
        <div className="bg-gray-800/90 backdrop-blur border border-gray-700 rounded-2xl p-8 flex-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
          <div className="flex flex-col items-center text-center h-full justify-between min-h-[300px]">
            <div>
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🎨
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Host Session
              </h2>
              <p className="text-gray-400 mb-6">
                Create a collab room and invite others to draw together ✨
              </p>
            </div>
            <div className="bg-gray-700/80 border border-purple-500/30 rounded-lg px-4 py-2 font-mono text-lg text-purple-300 tracking-wider mb-4">
              <span
                className={
                  roomCode === "ABCDEF"
                    ? "invisible"
                    : "text-yellow-500 font-extrabold"
                }
              >
                {roomCode}
              </span>
              <span onClick={joinHost}> 🚀</span>
            </div>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 w-full transform hover:scale-105"
              onClick={() => {
                generateCode();
              }}
            >
              🚀 Create Room
            </button>
          </div>
        </div>



        {/* Join Session Card */}
        <div className="bg-gray-800/90 backdrop-blur border border-gray-700 rounded-2xl p-8 flex-1 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group">
          <div className="flex flex-col items-center text-center h-full justify-between min-h-[300px]">
            <div className="w-full">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🔗
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Join Session
              </h2>
              <p className="text-gray-400 mb-6">
                Join and draw together in real-time 🎭
              </p>
              <input
                type="text"
                placeholder="🔑 Enter room code..."
                className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 mb-6 transition-all duration-300"
                value={inputRoom}
                onChange={(e)=>{
                  setInputRoom(e.target.value)
                }}
              />
            </div>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 w-full transform hover:scale-105" onClick={joinRoom}>
              🎯 Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;



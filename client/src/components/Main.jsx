import React, { useState } from "react";

const Main = () => {
  const [roomCode,setRoomCode] = useState("ABCDEF")
  const generateCode = () => {
    const random = Math.floor(Math.random()*1000000);
    setRoomCode(random);

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
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
              <h2 className="text-2xl font-bold text-white mb-4">Host Session</h2>
              <p className="text-gray-400 mb-6">
                Create a collab room and invite others to draw together ✨
              </p>
            </div>
            <div className="bg-gray-700/80 border border-purple-500/30 rounded-lg px-4 py-2 font-mono text-lg text-purple-300 tracking-wider mb-4">
              <span className={roomCode === "ABCDEF" ? "invisible":"text-red-500"}>{roomCode}</span>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 w-full transform hover:scale-105" onClick={generateCode}>
              🚀 Create Room
            </button>
          </div>
        </div>

        {/* Join Session Card */}
        <div className="bg-gray-800/90 backdrop-blur border border-gray-700 rounded-2xl p-8 flex-1 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group">
          <div className="flex flex-col items-center text-center h-full justify-between min-h-[300px]">
            <div className="w-full">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🔗</div>
              <h2 className="text-2xl font-bold text-white mb-4">Join Session</h2>
              <p className="text-gray-400 mb-6">
                Join and draw together in real-time 🎭
              </p>
              <input 
                type="text" 
                placeholder="🔑 Enter room code..." 
                className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 mb-6 transition-all duration-300"
              />
            </div>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 w-full transform hover:scale-105">
              🎯 Join Room
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;


//  const [input, setInput] = useState("");
//   const [roomId,setRoomId] = useState("");
//   return (
//     <div className="flex justify-center items-center h-screen flex-col gap-2">
//       {/* <h1 className='text-red-800'>Join the room</h1> */}
//       <input
//         className="bg-yellow-400 p-4 border-2 border-black h-6"
//         type="text"
//         placeholder="Join a room"
//         value={input}
//         onChange={(e) => {
//           setInput(e.target.value);
//         }}
//       />
//       <h1 className='text-red-600 ml-5' >Room Code: {input}</h1>
//       <button className="border-2 border-red-600" onClick={()=>{
//         //Logic to generate random Room Id
//         //Room ID : 6 digit
//         setRoomId(Math.random()*2000000)
//       }}>Create a room</button>
//       <h1 className='text-green-400 ml-5' >Room Created: {roomId}</h1>

//     </div>
//   );

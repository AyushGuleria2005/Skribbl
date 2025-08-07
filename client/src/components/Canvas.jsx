import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Canvas = (props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const posX = useRef(null);
  const posY = useRef(null);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://localhost:7777");
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    console.log("State change: isDrawing =" + isDrawing);

    

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <div>
      <canvas
        ref={canvasRef}
        {...props}
        onMouseMove={(e) => {
          if (isDrawing) {
            const ctx = canvasRef.current.getContext("2d");
            posX.current = e.clientX;
            posY.current = e.clientY;
            ctx.lineTo(posX.current, posY.current);
            ctx.stroke();
            socketRef.current.emit("drawing",{"posX":posX.current,"posY":posY.current});
          }
        }}
        onMouseDown={(e) => {
          const ctx = canvasRef.current.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(e.clientX, e.clientY);
          setIsDrawing(true);
        }}
        onMouseUp={() => {
          console.log("Mouse up");
          setIsDrawing(false);
        }}
      />
    </div>
  );
};

export default Canvas;

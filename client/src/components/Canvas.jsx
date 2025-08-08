import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Canvas = (props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const posX = useRef(null);
  const posY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const endX = useRef(null);
  const endY = useRef(null);
  const newX = useRef(null);
  const newY = useRef(null);
  const drawingCheck = useRef(false);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://localhost:7777");
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    console.log("State change: isDrawing =" + isDrawing);
    socketRef.current.on("drawing-client", (object) => {
      const { posX, posY, isDraw } = object;
      console.log("end points: " + endX.current, endY.current);
      console.log("pos: " + posX, posY);
      // console.log("new point: "+newX, newY);
      console.log(isDraw);
      if (endX.current !== null && endY.current !== null) {
        ctx.beginPath();
        ctx.moveTo(endX.current, endY.current);
        ctx.lineTo(posX, posY);
        ctx.stroke();
      }
      if (isDraw) {
        endX.current = posX;
        endY.current = posY;
      } else {
        endX.current = null;
        endY.current = null;
      }
    });
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
          newX.current = e.clientX;
          newY.current = e.clientY;
          // console.log(newX.current, newY.current);
          if (isDrawing) {
            const ctx = canvasRef.current.getContext("2d");
            posX.current = e.clientX;
            posY.current = e.clientY;
            ctx.lineTo(posX.current, posY.current);
            ctx.stroke();
            socketRef.current.emit("drawing-server", {
              posX: posX.current,
              posY: posY.current,
              isDraw: drawingCheck.current,
            });
          }
        }}
        onMouseDown={(e) => {
          const ctx = canvasRef.current.getContext("2d");
          ctx.beginPath();
          startX.current = e.clientX;
          startY.current = e.clientY;
          ctx.moveTo(e.clientX, e.clientY);
          drawingCheck.current = true;
          setIsDrawing(true);
        }}
        onMouseUp={() => {
          drawingCheck.current = false;
          socketRef.current.emit("drawing-server", {
            isDraw: drawingCheck.current,
          });
          setIsDrawing(false);
        }}
      />
    </div>
  );
};

export default Canvas;

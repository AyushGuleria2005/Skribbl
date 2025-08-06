import React, { useEffect, useMemo, useRef, useState } from "react";
import {io} from "socket.io-client"

const Canvas = (props) => {
  
  const socket = useMemo(()=>io("http://localhost:7777"),[]);

  //Selecting the canvas element
  const refCanvas = useRef();

  const [isDrawing, setIsDrawing] = useState(false);  // Responsible for state change of canvas
  // const [posX,setPosX] = useState(null);
  // const [posY,setPosY] = useState(null);
  const posX = useRef(null);
  const posY = useRef(null);

  const startPosX = useRef(null);
  const startPosY = useRef(null);

  const endPosX = useRef(null);
  const endPosY = useRef(null);
  
  useEffect(() => {
    const canvas = refCanvas.current;
    //Creating context i.e pencil to draw
    const ctx = canvas.getContext("2d");
    //Let's draw
    if (
      startPosX.current !== null &&
      startPosY.current !== null &&
      endPosX.current !== null &&
      endPosY.current !== null
    ) {
      ctx.beginPath();
      socket.emit("drawing",{"x":posX.current,"y":posY.current});
      // ctx.lineTo(posX.current, posY.current);
    }
  }, [isDrawing]);


  return (
    <div>
      <canvas
        ref={refCanvas}
        {...props}

        
        onMouseMove={(e) => {
          posX.current = e.clientX;
          posY.current = e.clientY;
          const ctx = refCanvas.current.getContext("2d");
          if (isDrawing) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            ctx.lineTo(posX.current, posY.current);
            ctx.stroke();
          }
        }}


        onMouseDown={() => {
          // console.log("Point clicked is: "+posX+" and "+posY);
          startPosX.current = posX.current;
          startPosY.current = posY.current;
          setIsDrawing(true);
          console.log("start X: " + startPosX.current);
          console.log("start Y: " + startPosY.current);
        }}


        onMouseUp={() => {
          // console.log("Point released is: "+posX+" and "+posY);
          endPosX.current = posX.current;
          endPosY.current = posY.current;
          console.log("end X: " + endPosX.current);
          console.log("end Y: " + endPosY.current);
          setIsDrawing(false);
        }}
      />
    </div>
  );
};

export default Canvas;



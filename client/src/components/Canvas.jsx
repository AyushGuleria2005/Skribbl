import React, { useEffect, useRef, useState } from "react";

const Canvas = (props) => {
  //Selecting the canvas element
  const ref = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  // const [posX,setPosX] = useState(null);
  // const [posY,setPosY] = useState(null);
  const posX = useRef(null);
  const posY = useRef(null);
  const startPosX = useRef(null);
  const startPosY = useRef(null);
  const endPosX = useRef(null);
  const endPosY = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
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
      ctx.moveTo(startPosX.current, startPosY.current);
      ctx.lineTo(endPosX.current, endPosY.current);
      ctx.lineCap = "round";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }, [isDrawing]);
  return (
    <div>
      <canvas
        ref={ref}
        {...props}
        onMouseMove={(e) => {
          posX.current = e.clientX;
          posY.current = e.clientY;

        }}
        onMouseDown={() => {
          // console.log("Point clicked is: "+posX+" and "+posY);
          startPosX.current = posX.current;
          startPosY.current = posY.current;
          setIsDrawing(true);
          // console.log(startPosX.current);
          // console.log(startPosY.current);
        }}
        onMouseUp={() => {
          // console.log("Point released is: "+posX+" and "+posY);
          endPosX.current = posX.current;
          endPosY.current = posY.current;
          console.log(endPosX.current);
          console.log(endPosY.current);
          setIsDrawing(false);
        }}
      />
    </div>
  );
};

export default Canvas;

// Click krne ke baad and hold that click ke baad we can only then use mousemove

//mousedown => click
//mousemove=> move my mouse
//mouseup => when i release my click

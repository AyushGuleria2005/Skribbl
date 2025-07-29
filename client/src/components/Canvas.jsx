import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    console.log(context);     // CanvasRenderingContext2d
    context.beginPath();
    context.moveTo(50, 100);
    context.lineTo(100, 200);
    context.lineTo(50, 200);
    context.closePath();

    context.fillStyle = "red";
    context.fill();

    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  },[]);
  return <canvas ref={ref} {...props} />;
};

export default Canvas;

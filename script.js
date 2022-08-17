// An array of objects, each formatted as `{ x: STRING, y: NUMBER }`
import { sampleData, debugData } from "./sampleData.js";

const attachToCanvasElement = (elementID) => {
  const canvas = document.getElementById(elementID);
  const ctx = canvas.getContext("2d");

  // Make canvas high resolution
  const width = canvas.width;
  const height = canvas.height;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  ctx.scale(scale, scale);

  return { ctx, width, height };
};

const renderStaticGraph = ({
  data,
  elementID,
  yMax,
  topLabel,
  bottomLeftLabel,
  bottomRightLabel,
  backgroundColor,
  fillColor
}) => {
  const { ctx, width, height } = attachToCanvasElement(elementID);

  const draw = () => {
    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw graph line
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(0, height);
    data.forEach(({ x, y }, index) => {
      ctx.lineTo(
        (width / (data.length - 1)) * index,
        height - height * (y / yMax)
      );
    });
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Draw labels
    ctx.fillStyle = "#000";
    ctx.font = "10px sans-serif";
    ctx.fillText(topLabel, 4, 12);
    ctx.fillText(bottomLeftLabel, 4, height - 5);
    ctx.fillText(
      bottomRightLabel,
      width - ctx.measureText(bottomRightLabel).width - 4,
      height - 5
    );
  };

  draw();
};

const renderGraphOverlay = ({ data, elementID, yMax, fillColor }) => {
  const { ctx, width, height } = attachToCanvasElement(elementID);

  const draw = ({ mouseX }) => {
    const cursorWidth = width / (data.length - 1);
    const getIndexFromXPos = Math.min(
      Math.floor(mouseX / cursorWidth),
      data.length - 2
    );
    const cursorX = cursorWidth * getIndexFromXPos;
    const dataPointStart = data[getIndexFromXPos];
    const dataPointEnd = data[getIndexFromXPos + 1];

    // Draw cursor
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(cursorX, 0, cursorWidth, height);
    ctx.restore();

    // Draw labels
    ctx.font = "10px sans-serif";
    const labelXAxis = `${dataPointStart.x}-${dataPointEnd.x}`;
    const labelYAxis = `${dataPointStart.y}-${dataPointEnd.y}`;
    const labelYAxisYPos =
      height -
      height *
        ((dataPointStart.y - (dataPointStart.y - dataPointEnd.y) / 2) / yMax);
    const widestLabel = Math.max(
      ctx.measureText(labelXAxis).width,
      ctx.measureText(labelYAxis).width
    );

    if (cursorX + cursorWidth + widestLabel > width) {
      ctx.fillText(
        labelXAxis,
        cursorX - ctx.measureText(labelXAxis).width,
        height - 5
      );
      ctx.fillText(
        labelYAxis,
        cursorX - ctx.measureText(labelYAxis).width,
        labelYAxisYPos
      );
    } else {
      ctx.fillText(labelXAxis, cursorX + cursorWidth, height - 5);
      ctx.fillText(labelYAxis, cursorX + cursorWidth, labelYAxisYPos);
    }
  };

  document
    .getElementById(elementID)
    .addEventListener("mousemove", ({ offsetX }) => {
      requestAnimationFrame(() => draw({ mouseX: offsetX }));
    });
};

renderStaticGraph({
  data: sampleData,
  elementID: "graphCanvasElement",
  yMax: Math.max(...sampleData.map(({ x, y }) => y)),
  topLabel: "DDOG",
  bottomLeftLabel: sampleData[0].x,
  bottomRightLabel: sampleData[sampleData.length - 1].x,
  backgroundColor: "#a37d00",
  fillColor: "#fcc203"
});

renderGraphOverlay({
  data: sampleData,
  elementID: "graphOverlayElement",
  yMax: Math.max(...sampleData.map(({ x, y }) => y)),
  fillColor: "black"
});

renderStaticGraph({
  data: debugData,
  elementID: "debugGraphCanvasElement",
  yMax: Math.max(...debugData.map(({ x, y }) => y)),
  topLabel: "Simple Demo",
  bottomLeftLabel: debugData[0].x,
  bottomRightLabel: debugData[debugData.length - 1].x,
  backgroundColor: "#a37d00",
  fillColor: "#fcc203"
});

renderGraphOverlay({
  data: debugData,
  elementID: "debugGraphOverlayElement",
  yMax: Math.max(...debugData.map(({ x, y }) => y)),
  fillColor: "black"
});

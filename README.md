# A very simple interactive timeseries graph

![](https://raw.githubusercontent.com/ehmorris/very-simple-interactive-timeseries-graph/readme/demo1.gif)

![](https://raw.githubusercontent.com/ehmorris/very-simple-interactive-timeseries-graph/readme/demo2.gif)

HTML Should look like this:

``` HTML
<div style="position: relative;">
  <canvas id="graphCanvasElement" width="600px" height="200px"></canvas>
  <canvas
    id="graphOverlayElement"
    width="600px"
    height="200px"
    style="position: absolute; top: 0; left: 0;"
  ></canvas>
</div>
```

JS Should look like this:

``` JS
renderStaticGraph({
  data: sampleData,
  elementID: "graphCanvasElement",
  yMax: 999),
  topLabel: "Some Label",
  bottomLeftLabel: "Some Label",
  bottomRightLabel: "Some Label",
  backgroundColor: "#000",
  fillColor: "#fff"
});

renderGraphOverlay({
  data: sampleData,
  elementID: "graphOverlayElement",
  yMax: 999),
  fillColor: "red"
});
```

Data should look like this:

``` JS
const sampleData = [ { x:STRING, y:FLOAT } ];
```

See `index.html` for a demo.
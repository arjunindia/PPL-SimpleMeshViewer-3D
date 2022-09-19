import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";

export default function babylon(canvas) {
  var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  };

  let engine = null;
  let scene = null;
  let sceneToRender = null;
  let createDefaultEngine = function () {
    return new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });
  };
  const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 2,
      6,
      BABYLON.Vector3.Zero()
    );
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );

    const myPoints = [
      new BABYLON.Vector3(-2, -1, 0),
      new BABYLON.Vector3(0, 1, 0),
      new BABYLON.Vector3(2, -1, 0),
    ];

    myPoints.push(myPoints[0]);

    const myColors = [
      new BABYLON.Color4(1, 0, 0, 1),
      new BABYLON.Color4(0, 1, 0, 1),
      new BABYLON.Color4(0, 0, 1, 1),
    ];
    myColors.push(myColors[0]);
    const lines = BABYLON.MeshBuilder.CreateLines("lines", {
      points: myPoints,
      colors: myColors,
    });

    return scene;
  };

  const initFunction = async function () {
    var asyncEngineCreation = async function () {
      try {
        return createDefaultEngine();
      } catch (e) {
        console.log(
          "the available createEngine function failed. Creating the default engine instead"
        );
        return createDefaultEngine();
      }
    };

    engine = await asyncEngineCreation();
    if (!engine) throw "engine should not be null.";
    startRenderLoop(engine, canvas);
    scene = createScene();
  };
  initFunction().then(() => {
    sceneToRender = scene;
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

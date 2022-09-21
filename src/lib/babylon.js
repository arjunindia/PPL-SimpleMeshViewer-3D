//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
//import "@babylonjs/loaders/glTF";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

export default async function babylon(canvas, vertexes, colors, segments) {
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
    return new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });
  };
  const createScene = () => {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 2,
      6,
      Vector3.Zero()
    );
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    let myPoints = [];
    let myColors = [];
    segments.forEach((segment, n) => {
      segment.forEach((point) => {
        myPoints.push(vertexes[point]);
        myColors.push(colors[point]);
      });
      const lines = MeshBuilder.CreateLines("lines" + n, {
        points: myPoints,
        colors: myColors,
      });
      myPoints = [];
      myColors = [];
    });
    // const myPoints = [
    //   new Vector3(-2, -1, 0),
    //   new Vector3(0, 1, 0),
    //   new Vector3(2, -1, 0),
    // ];

    // myPoints.push(myPoints[0]);

    // const myColors = [
    //   new Color4(1, 0, 0, 1),
    //   new Color4(0, 1, 0, 1),
    //   new Color4(0, 0, 1, 1),
    // ];
    // myColors.push(myColors[0]);

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

  function destroyBabylon() {
    console.log(scene);
    scene.dispose();
    engine.dispose();
    sceneToRender = null;
    scene = null;
    engine = null;
  }
  return destroyBabylon;
}

// Helpers

/**
 * @param {any[]} points
 */

export function vectorizePoints(points) {
  return points.map((point) => new Vector3(...point));
}

//{0xffffffff, 0xffff00ff, 0xff00ffff, 0xff0000ff}
export function parseColor(colors) {
  return colors.map((color) => {
    const r = parseInt(color.slice(3, 5), 16) / 255;
    const g = parseInt(color.slice(5, 7), 16) / 255;
    const b = parseInt(color.slice(7, 9), 16) / 255;
    const a = parseInt(color.slice(9, 11), 16);
    return new Color4(r, g, b, a);
  });
}

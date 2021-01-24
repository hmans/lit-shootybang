import { ThreeScene } from "https://cdn.skypack.dev/three-elements"
import {
  CubeTextureLoader,
  LinearEncoding
} from "https://cdn.skypack.dev/three"

class SpaceScene extends ThreeScene {
  readyCallback() {
    super.readyCallback()

    const scene = this.object
    this.game.renderer.outputEncoding = LinearEncoding

    /* Load skybox */
    const loader = new CubeTextureLoader()
    const texture = loader.load([
      "/textures/skybox/right.png",
      "/textures/skybox/left.png",
      "/textures/skybox/top.png",
      "/textures/skybox/bottom.png",
      "/textures/skybox/front.png",
      "/textures/skybox/back.png"
    ])
    scene.background = texture
  }
}

console.log("hi from space-scene")

customElements.define("space-scene", SpaceScene)

import { ThreeScene } from "https://cdn.skypack.dev/three-elements"
import {
  CubeTextureLoader,
  LinearEncoding
} from "https://cdn.skypack.dev/three"
import { world } from "./physics.mjs"

const fixedTimeStep = 1.0 / 60.0
const maxSubSteps = 3

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

    /* Register physics ticking */
    this.ontick = () => {
      world.step(fixedTimeStep, this.game.deltaTime, maxSubSteps)
    }
  }
}

customElements.define("space-scene", SpaceScene)

import { ThreeScene } from "https://cdn.skypack.dev/three-elements"
import {
  CubeTextureLoader,
  LinearEncoding
} from "https://cdn.skypack.dev/three"
import { EffectComposer } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/RenderPass"

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

    this.setupComposer()

    /* Register physics ticking */
    this.ontick = () => {
      world.step(fixedTimeStep, this.game.deltaTime, maxSubSteps)
    }
  }

  setupComposer() {
    const { renderer } = this.game
    const scene = this.object
    const { camera } = this

    this.composer = new EffectComposer(renderer)

    /* Add normal render pass */
    const renderPass = new RenderPass(scene, camera)
    renderPass.enabled = true
    this.composer.addPass(renderPass)
  }

  render() {
    this.composer && this.composer.render()
    // renderer.clearDepth()
    // renderer.render(this.object, this.camera)
  }
}

customElements.define("space-scene", SpaceScene)

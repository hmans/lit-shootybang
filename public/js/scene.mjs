import { ThreeScene } from "https://cdn.skypack.dev/three-elements"
import * as THREE from "https://cdn.skypack.dev/three"
import { EffectComposer } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/ShaderPass"
import { VignetteShader } from "https://cdn.skypack.dev/three/examples/jsm/shaders/VignetteShader"

import { world } from "./physics.mjs"

const fixedTimeStep = 1.0 / 60.0
const maxSubSteps = 3

class SpaceScene extends ThreeScene {
  readyCallback() {
    super.readyCallback()

    const scene = this.object
    this.game.renderer.outputEncoding = THREE.LinearEncoding

    /* Load skybox */
    const loader = new THREE.CubeTextureLoader()
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
    const { game, camera } = this
    const { renderer, width, height } = game
    const scene = this.object

    this.composer = new EffectComposer(renderer)

    /* Add normal render pass */
    const renderPass = new RenderPass(scene, camera)
    renderPass.enabled = true
    this.composer.addPass(renderPass)

    /* Add bloom pass */
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      8,
      1,
      0.6
    )
    this.composer.addPass(bloom)

    /* Vignette */
    const vignette = new ShaderPass(VignetteShader)
    this.composer.addPass(vignette)
  }

  render() {
    this.composer && this.composer.render()
    // renderer.clearDepth()
    // renderer.render(this.object, this.camera)
  }
}

customElements.define("space-scene", SpaceScene)

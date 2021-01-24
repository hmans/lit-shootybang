import * as THREE from "https://cdn.skypack.dev/three"
import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import "https://cdn.skypack.dev/three-elements"
import { html, render } from "https://cdn.skypack.dev/lit-html"
import { stick, handleInput } from "./input.mjs"
import "./scene.mjs"

const world = new CANNON.World()
world.gravity.set(0, 0, 0)

const shipBody = new CANNON.Body({
  mass: 1000,
  position: new CANNON.Vec3(0, 0, 0),
  shape: new CANNON.Sphere(2),
  angularDamping: 0.8,
  linearDamping: 0.8
})

world.addBody(shipBody)

const Spaceship = () => {
  /* Interpolate camera */
  const offset = new THREE.Vector3(0, 3, 10).applyQuaternion(
    shipBody.quaternion
  )
  const target = new THREE.Vector3().copy(shipBody.position).add(offset)
  if (window.scene) {
    const camera = window.scene.camera
    camera.position.lerp(target, 0.02)
    const tq = new THREE.Quaternion().copy(shipBody.quaternion)
    camera.quaternion.slerp(tq, 0.02)
    // camera.lookAt(shipBody.position)
  }

  /* Render spaceship */
  return html`
    <three-group
      position.x=${shipBody.position.x}
      position.y=${shipBody.position.y}
      position.z=${shipBody.position.z}
      quaternion.x=${shipBody.quaternion.x}
      quaternion.y=${shipBody.quaternion.y}
      quaternion.z=${shipBody.quaternion.z}
      quaternion.w=${shipBody.quaternion.w}
    >
      <three-gltf-asset
        url="/models/spaceship/spaceship.gltf"
        scale="0.2"
      ></three-gltf-asset>
    </three-group>
  `
}

const Lights = () => html`
  <three-ambient-light intensity="0.1"></three-ambient-light>
  <three-directional-light
    intensity="0.9"
    position="10, 40, 50"
    cast-shadow
  ></three-directional-light>
`

const Game = () => html`
  <three-game>
    <space-scene id="scene"> ${Lights()} ${Spaceship()} </space-scene>
  </three-game>
`

const App = () => html`${Game()}`

const rerender = () => {
  render(App(), document.body)
}

rerender()

/* Ticker */
let lastTime = performance.now()
const fixedTimeStep = 1.0 / 60.0
const maxSubSteps = 3

const tick = () => {
  /* Determine deltatime */
  const time = performance.now()
  const deltaMs = time - lastTime
  const dt = deltaMs / 1000
  lastTime = time

  /* process input */
  handleInput()

  /* Rotate ship */
  const torque = new THREE.Vector3(
    stick.y * -10000,
    0,
    stick.x * -30000
  ).applyQuaternion(shipBody.quaternion)
  shipBody.torque.copy(torque)

  /* Move ship forward */
  const force = new THREE.Vector3(0, 0, -8000).applyQuaternion(
    shipBody.quaternion
  )
  shipBody.applyForce(force)

  /* Run physics */
  world.step(fixedTimeStep, dt, maxSubSteps)

  /* Render game */
  rerender()

  requestAnimationFrame(tick)
}

tick()

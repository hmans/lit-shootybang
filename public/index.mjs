import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import "https://cdn.skypack.dev/three-elements"
import { html, render } from "https://cdn.skypack.dev/lit-html"
import { stick, handleInput } from "./input.mjs"

const world = new CANNON.World()
world.gravity.set(0, 0, 0)

const shipBody = new CANNON.Body({
  mass: 1000,
  shape: new CANNON.Sphere(2)
})

world.addBody(shipBody)

const Spaceship = () => html`
  <three-group
    position.x=${shipBody.position.x}
    position.y=${shipBody.position.y}
  >
    <three-gltf-asset
      url="/models/spaceship/spaceship.gltf"
      rotation.x=${Math.PI / 2}
      scale="0.2"
    ></three-gltf-asset>
  </three-group>
`

const Lights = () => html`
  <three-ambient-light intensity="0.2"></three-ambient-light>
  <three-directional-light
    intensity="0.8"
    position="10, 40, 50"
    cast-shadow
  ></three-directional-light>
`

const Game = () => html`
  <three-game>
    <three-scene> ${Lights()} ${Spaceship()} </three-scene>
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

  /* Apply ship force */
  shipBody.applyForce(stick.multiplyScalar(10000))

  /* Run physics */
  world.step(fixedTimeStep, dt, maxSubSteps)

  /* Render game */
  rerender()

  requestAnimationFrame(tick)
}

tick()

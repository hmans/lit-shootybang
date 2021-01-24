import "https://cdn.skypack.dev/three-elements"
import { html, render } from "https://cdn.skypack.dev/lit-html"

const Spaceship = () => html`
  <three-group>
    <three-gltf-asset url="/models/spaceship/spaceship.gltf" rotation.x=${Math.PI / 2} scale="0.2"></three-gltf-asset>
  </three-group>
`

const Lights = () => html`
  <three-ambient-light intensity="0.2"></three-ambient-light>
  <three-directional-light intensity="0.8" position="10, 40, 50" cast-shadow></three-directional-light>
`

const Game = () => html`
  <three-game>
    <three-scene>
      ${Lights()}
      ${Spaceship()}
    </three-scene>
  </three-game>
`

const App = () => html`${Game()}`

render(App(), document.body)

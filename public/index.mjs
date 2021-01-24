import "https://cdn.skypack.dev/three-elements"
import { html, render } from "https://cdn.skypack.dev/lit-html"

const Spaceship = () => html`
  <three-mesh scale="3.5" receive-shadow cast-shadow>
    <three-dodecahedron-buffer-geometry></three-dodecahedron-buffer-geometry>
    <three-mesh-standard-material color="hotpink"></three-mesh-standard-material>
  </three-mesh>
`

const Game = () => html`
  <three-game>
    <three-scene>
      <!-- Lights -->
      <three-ambient-light intensity="0.2"></three-ambient-light>
      <three-directional-light intensity="0.8" position="10, 40, 50" cast-shadow></three-directional-light>

      ${Spaceship()}
    </three-scene>
  </three-game>
`

const App = () => html`${Game()}`

render(App(), document.body)

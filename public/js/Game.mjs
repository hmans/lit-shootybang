import { html } from "https://cdn.skypack.dev/lit-html"
import { Spaceship } from "./Spaceship.mjs"

const Lights = () => html`
  <three-ambient-light intensity="0.1"></three-ambient-light>
  <three-directional-light
    intensity="0.9"
    position="10, 40, 50"
    cast-shadow
  ></three-directional-light>
`

export const Game = () => html`
  <three-game>
    <space-scene id="scene"> ${Lights()} ${Spaceship()} </space-scene>
  </three-game>
`

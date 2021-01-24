import { html, render } from "https://cdn.skypack.dev/lit-html"
import "https://cdn.skypack.dev/three-elements"
import { Game } from "./Game.mjs"
import "./scene.mjs"
import { startTicking } from "./ticker.mjs"

const App = () => html`${Game()}`

startTicking(() => {
  render(App(), document.body)
})

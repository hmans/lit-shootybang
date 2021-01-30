import { html, render } from "https://cdn.skypack.dev/lit-html"
import "https://cdn.skypack.dev/three-elements@next"
import { Game } from "./Game.mjs"
import "./scene.mjs"

const App = () => html`${Game()}`

const rerender = () => {
  render(App(), document.body)
}

rerender()

document.getElementById("scene").lateTick = () => {
  rerender()
}

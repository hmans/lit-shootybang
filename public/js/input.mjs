import hotkeys from "https://cdn.skypack.dev/hotkeys-js"
import { Vector2 } from "https://cdn.skypack.dev/three"

/*
We need to initialize hotkeys with a fake event handler, otherwise its
isPressed() function won't work :(
*/
hotkeys("*", () => {})

const stick = new Vector2()
let buttonA = false
let buttonAccelerate = false

const { isPressed } = hotkeys

const handleInput = () => {
  stick.set(0, 0)
  if (isPressed("w")) stick.y += 1
  if (isPressed("s")) stick.y -= 1
  if (isPressed("a")) stick.x -= 1
  if (isPressed("d")) stick.x += 1

  buttonA = isPressed("space")
  buttonAccelerate = isPressed("shift")
}

export { handleInput, stick, buttonA, buttonAccelerate }

import { Howl } from "https://cdn.skypack.dev/howler"

export const sounds = {
  fire: new Howl({ src: "/sounds/laser.wav", volume: 0.5, preload: true })
}

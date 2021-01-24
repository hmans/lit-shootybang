import { makeStore } from "https://cdn.skypack.dev/statery"

export const store = makeStore({
  bullets: new Array(100),
  asteroids: []
})

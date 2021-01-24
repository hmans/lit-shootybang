import * as CANNON from "https://cdn.skypack.dev/cannon-es"

export const world = new CANNON.World()
world.gravity.set(0, 0, 0)

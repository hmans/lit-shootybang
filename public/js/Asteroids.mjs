import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import { html } from "https://cdn.skypack.dev/lit-html"
import { store } from "./store.mjs"
import { world } from "./physics.mjs"
import { insideUnitSphere } from "./random.mjs"
import { inside } from "./random.mjs"

export const spawnAsteroid = (position, quaternion, scale = 1) => {
  const body = new CANNON.Body({
    mass: 1000 * scale,
    position,
    quaternion,
    shape: new CANNON.Sphere(2.2 * scale),
    linearDamping: 0.8,
    angularDamping: 0.8
  })

  body._scale = scale

  world.addBody(body)

  store.set(({ asteroids }) => ({ asteroids: [...asteroids, body] }))
}

/* Spawn a bunch of asteroids */
for (let i = 0; i < 80; i++) {
  const position = insideUnitSphere().multiplyScalar(500)
  const rotation = insideUnitSphere()
  const quaternion = new CANNON.Quaternion().setFromEuler(
    rotation.x,
    rotation.y,
    rotation.z
  )
  const scale = Math.pow(inside(1, 5), 2)

  spawnAsteroid(position, quaternion, scale)
}

const Asteroid = (body) => {
  return html`
    <three-group
      position.x=${body.position.x}
      position.y=${body.position.y}
      position.z=${body.position.z}
      quaternion.x=${body.quaternion.x}
      quaternion.y=${body.quaternion.y}
      quaternion.z=${body.quaternion.z}
      quaternion.w=${body.quaternion.w}
    >
      <three-gltf-asset
        scale=${body._scale}
        url="/models/asteroid/asteroid.gltf"
      ></three-gltf-asset>
      ></three-group
    >
  `
}

export const Asteroids = () => {
  return html`
    <three-group name="asteroids">
      ${store.state.asteroids.map((asteroid) => Asteroid(asteroid))}
    </three-group>
  `
}

import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import { html } from "https://cdn.skypack.dev/lit-html"
import { store } from "./store.mjs"
import { world } from "./physics.mjs"

/* Create 100 bullets */
for (let i = 0; i < 100; i++) {
  store.state.bullets[i] = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Sphere(0.1),
    linearDamping: 0,
    angularDamping: 0,
    collisionFilterGroup: 2,
    collisionFilterMask: 4
  })
}

let nextBullet = 0

const bulletForce = new CANNON.Vec3(0, 0, -5000)
export const spawnBullet = (position, quaternion) => {
  const bulletBody = store.state.bullets[nextBullet]

  bulletBody.position.copy(position)
  bulletBody.quaternion.copy(quaternion)
  bulletBody.velocity.setZero()

  world.addBody(bulletBody)

  const force = bulletBody.quaternion.vmult(bulletForce)
  bulletBody.applyForce(force)

  setTimeout(() => {
    world.removeBody(bulletBody)
  }, 1000)

  nextBullet = (nextBullet + 1) % 100
}

const Bullet = (bulletBody, key) => {
  return html`
    <three-group
      key=${key}
      position.x=${bulletBody.position.x}
      position.y=${bulletBody.position.y}
      position.z=${bulletBody.position.z}
      quaternion.x=${bulletBody.quaternion.x}
      quaternion.y=${bulletBody.quaternion.y}
      quaternion.z=${bulletBody.quaternion.z}
      quaternion.w=${bulletBody.quaternion.w}
    >
      <three-mesh>
        <three-box-buffer-geometry
          args="0.2, 0.2, 0.8"
        ></three-box-buffer-geometry>
        <three-mesh-standard-material
          color="yellow"
          emissive="yellow"
          emissive-intensity="10"
        ></three-mesh-standard-material> </three-mesh
    ></three-group>
  `
}

export const Bullets = () => {
  return html`
    <three-group name="bullets">
      ${store.state.bullets.map((bullet, i) =>
        bullet.world ? Bullet(bullet, i) : null
      )}
    </three-group>
  `
}

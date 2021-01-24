import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import { html } from "https://cdn.skypack.dev/lit-html"
import { store } from "./store.mjs"
import { world } from "./physics.mjs"

export const spawnBullet = (position, quaternion) => {
  const bulletBody = new CANNON.Body({
    mass: 1,
    position,
    quaternion,
    shape: new CANNON.Sphere(0.1),
    linearDamping: 0,
    angularDamping: 0,
    collisionFilterGroup: 2,
    collisionFilterMask: 4
  })

  world.addBody(bulletBody)

  const force = bulletBody.quaternion.vmult(new CANNON.Vec3(0, 0, -5000))
  bulletBody.applyForce(force)

  store.state.bullets.push(bulletBody)
  setTimeout(() => store.state.bullets.shift(), 1000)
}

const Bullet = (bulletBody) => {
  return html`
    <three-mesh
      position.x=${bulletBody.position.x}
      position.y=${bulletBody.position.y}
      position.z=${bulletBody.position.z}
      quaternion.x=${bulletBody.quaternion.x}
      quaternion.y=${bulletBody.quaternion.y}
      quaternion.z=${bulletBody.quaternion.z}
      quaternion.w=${bulletBody.quaternion.w}
    >
      <three-box-buffer-geometry
        args="[0.2, 0.2, 0.8]"
      ></three-box-buffer-geometry>
      <three-mesh-standard-material
        color="yellow"
        emissive="yellow"
      ></three-mesh-standard-material>
    </three-mesh>
  `
}

export const Bullets = () => {
  return html`
    <three-group name="bullets">
      ${store.state.bullets.map((bullet) => Bullet(bullet))}
    </three-group>
  `
}

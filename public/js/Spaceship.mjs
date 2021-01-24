import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import { html } from "https://cdn.skypack.dev/lit-html"
import * as THREE from "https://cdn.skypack.dev/three"
import { world } from "./physics.mjs"
import { stick, buttonA, handleInput } from "./input.mjs"
import { spawnBullet } from "./bullets.mjs"

const shipBody = new CANNON.Body({
  mass: 1000,
  position: new CANNON.Vec3(0, 0, 0),
  shape: new CANNON.Sphere(2),
  angularDamping: 0.8,
  linearDamping: 0.8
})

world.addBody(shipBody)

function moveShip() {
  /* Rotate ship */
  const torque = new THREE.Vector3(
    stick.y * -10000,
    0,
    stick.x * -30000
  ).applyQuaternion(shipBody.quaternion)
  shipBody.torque.copy(torque)

  /* Move ship forward */
  const force = new THREE.Vector3(0, 0, -8000).applyQuaternion(
    shipBody.quaternion
  )
  shipBody.applyForce(force)
}

function moveCamera(el) {
  /* Interpolate camera */
  const offset = new THREE.Vector3(0, 3, 10).applyQuaternion(
    shipBody.quaternion
  )

  const target = new THREE.Vector3().copy(shipBody.position).add(offset)

  const camera = el.scene.camera
  camera.position.lerp(target, 0.02)
  const tq = new THREE.Quaternion().copy(shipBody.quaternion)
  camera.quaternion.slerp(tq, 0.02)
  // camera.lookAt(shipBody.position.x, shipBody.position.y, shipBody.position.z)
}

function spread(quaternion, amplitude = 0.01) {
  const spreadQuat = new CANNON.Quaternion(
    Math.random() * amplitude * 2 - amplitude,
    Math.random() * amplitude * 2 - amplitude,
    Math.random() * amplitude * 2 - amplitude
  )
  return quaternion.mult(spreadQuat)
}

let lastFireTime = 0
function fireBullets() {
  const t = performance.now()
  if (buttonA && t > lastFireTime + 60) {
    let offset = shipBody.quaternion.vmult(new CANNON.Vec3(1, 0, -1))
    spawnBullet(shipBody.position.vadd(offset), spread(shipBody.quaternion))
    offset = shipBody.quaternion.vmult(new CANNON.Vec3(-1, 0, -1))
    spawnBullet(shipBody.position.vadd(offset), spread(shipBody.quaternion))
    lastFireTime = t
  }
}

function onTick() {
  handleInput()
  moveShip()
  moveCamera(this)
  fireBullets()
}

export const Spaceship = () => {
  /* Render spaceship */
  return html`
    <three-group
      ticking="true"
      @tick=${onTick}
      position.x=${shipBody.position.x}
      position.y=${shipBody.position.y}
      position.z=${shipBody.position.z}
      quaternion.x=${shipBody.quaternion.x}
      quaternion.y=${shipBody.quaternion.y}
      quaternion.z=${shipBody.quaternion.z}
      quaternion.w=${shipBody.quaternion.w}
    >
      <three-gltf-asset
        url="/models/spaceship/spaceship.gltf"
        scale="0.2"
      ></three-gltf-asset>
      <three-mesh position.z="0.7">
        <three-box-buffer-geometry
          args="[1, 0.2, 0.2]"
        ></three-box-buffer-geometry>
        <three-mesh-standard-material
          emissive="cyan"
          emissive-intensity="10"
        ></three-mesh-standard-material>
      </three-mesh>
    </three-group>
  `
}

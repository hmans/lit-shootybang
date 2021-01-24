import * as CANNON from "https://cdn.skypack.dev/cannon-es"
import { html } from "https://cdn.skypack.dev/lit-html"
import * as THREE from "https://cdn.skypack.dev/three"
import { world } from "./physics.mjs"

const shipBody = new CANNON.Body({
  mass: 1000,
  position: new CANNON.Vec3(0, 0, 0),
  shape: new CANNON.Sphere(2),
  angularDamping: 0.8,
  linearDamping: 0.8
})

world.addBody(shipBody)

export const Spaceship = () => {
  /* Interpolate camera */
  const offset = new THREE.Vector3(0, 3, 10).applyQuaternion(
    shipBody.quaternion
  )
  const target = new THREE.Vector3().copy(shipBody.position).add(offset)
  if (window.scene) {
    const camera = window.scene.camera
    camera.position.lerp(target, 0.02)
    const tq = new THREE.Quaternion().copy(shipBody.quaternion)
    camera.quaternion.slerp(tq, 0.02)
    // camera.lookAt(shipBody.position)
  }

  /* Render spaceship */
  return html`
    <three-group
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
    </three-group>
  `
}

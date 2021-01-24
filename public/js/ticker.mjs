import { stick, handleInput } from "./input.mjs"
import { world } from "./physics.mjs"

export const startTicking = (fun) => {
  let lastTime = performance.now()
  const fixedTimeStep = 1.0 / 60.0
  const maxSubSteps = 3

  const tick = () => {
    /* Determine deltatime */
    const time = performance.now()
    const deltaMs = time - lastTime
    const dt = deltaMs / 1000
    lastTime = time

    /* process input */
    handleInput()

    // /* Rotate ship */
    // const torque = new THREE.Vector3(
    //   stick.y * -10000,
    //   0,
    //   stick.x * -30000
    // ).applyQuaternion(shipBody.quaternion)
    // shipBody.torque.copy(torque)

    // /* Move ship forward */
    // const force = new THREE.Vector3(0, 0, -8000).applyQuaternion(
    //   shipBody.quaternion
    // )
    // shipBody.applyForce(force)

    /* Run physics */
    world.step(fixedTimeStep, dt, maxSubSteps)

    /* Execute callback */
    fun()

    requestAnimationFrame(tick)
  }

  tick()
}

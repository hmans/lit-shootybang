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

    /* Run physics */
    world.step(fixedTimeStep, dt, maxSubSteps)

    /* Execute callback */
    fun()

    requestAnimationFrame(tick)
  }

  tick()
}

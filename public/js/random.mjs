import { Vector2, Vector3 } from "https://cdn.skypack.dev/three"

const PI2 = Math.PI * 2

export const value = (f = 1) => Math.random() * f

export const chance = (threshold = 0.5) => Math.random() < threshold

export const inside = (min, max) => min + value(max - min)

export const upto = (max) => inside(0, max)

export const radian = () => value(PI2)

export const vector2 = () => new Vector2(value(), value())

export const pick = (list) => list[Math.floor(upto(list.length))]

export const insideUnitCircle = () => {
  /* What would we do without Stack Overflow? https://stackoverflow.com/a/5838055 */
  const t = radian()
  const u = value() + value()
  const r = u > 1 ? 2 - u : u

  return new Vector2(Math.cos(t) * r, Math.sin(t) * r)
}

export const insideUnitSphere = (target) => {
  /* With many thanks to: https://karthikkaranth.me/blog/generating-random-points-in-a-sphere/ */
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random())
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const x = r * sinPhi * cosTheta
  const y = r * sinPhi * sinTheta
  const z = r * cosPhi

  return target?.set(x, y, z) || new Vector3(x, y, z)
}

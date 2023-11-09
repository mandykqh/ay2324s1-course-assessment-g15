type Point = { x: number; y: number }

export type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}
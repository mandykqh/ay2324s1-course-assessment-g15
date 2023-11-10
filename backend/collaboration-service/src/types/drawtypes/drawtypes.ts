type Point = { x: number; y: number }

export type DrawLineProps = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
  width: number
}
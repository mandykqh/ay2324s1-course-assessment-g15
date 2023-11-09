type Point = { x: number; y: number }

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}
type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point;
    prevPoint: Point | null;
}
  
type Point = { x: number; y: number }
  
  
type LineHistory = {
    ctx: CanvasRenderingContext2D
    history: DrawLineProps[]
}

type DrawLineProps = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
    color: string
    width: number
}
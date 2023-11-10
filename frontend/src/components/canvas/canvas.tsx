import { HStack, VStack, Box, Text, Flex, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import React, { useEffect, useState, useRef } from "react";
import { useDraw } from "./hooks/useDraw";
import { drawLine } from "./utils/drawLine";
import { CanvasProps } from "../../Commons";

const CanvasPage: React.FC<CanvasProps> = ({ socket }) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown } = useDraw(createLine);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // Create a ref for ctx
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => { 
    const ctx = canvasRef.current?.getContext("2d");
    ctxRef.current = ctx as CanvasRenderingContext2D | null;


    // Add event listener for window resize

    socket?.emit("client-ready");

    socket?.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      console.log("sending canvas state");
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket?.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket?.on("draw-line", ({ prevPoint, currentPoint, color, width }: DrawLineProps) => {
      if (!ctx) return console.log("no ctx here");
      drawLine({ prevPoint, currentPoint, ctx, color , width});
    });

    socket?.on("canvas-clear", () => {
      clearCanvas();
    })

    return () => {
      socket?.off("draw-line");
      socket?.off("get-canvas-state");
      socket?.off("canvas-state-from-server");
      socket?.off("canvas-clear");
    };
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket?.emit("draw-line", { prevPoint, currentPoint, color, lineWidth });
    // Set the updated history in the state
    const width = lineWidth;
    drawLine({ prevPoint, currentPoint, ctx, color, width });
  }

  function handleLineWidthChange(newWidth:number) {
    setLineWidth(newWidth);
  }

  function toggleEraserMode() {
    setIsEraserMode(!isEraserMode);
    // Change the color to white when eraser mode is enabled
    setColor(isEraserMode ? '#000000' : '#ffffff');
  };
  

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };


  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack>
      <HStack mr="auto" >
        <HStack>
          <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          <VStack>
            <Button
              type="button"
              p={2}
              rounded="md"
              borderWidth={1}
              color="white"
              borderColor="white"
              onClick={() => {
                socket?.emit("canvas-clear");
                clearCanvas();
              }}
            >
              Clear
            </Button>
            <HStack>
              <Text fontSize="md" mb={2} color={'white'}>Eraser</Text>
              <Switch
                size="sm"
                colorScheme="gray"
                color={"blue"}
                isChecked={isEraserMode}
                onChange={toggleEraserMode}
              />
            </HStack>
            <Box>
              <Text fontSize="md" color={"white"} mb={2}>
                Line Width
              </Text>
              <Slider
                min={5} // Set the minimum line width
                max={25} // Set the maximum line width
                value={lineWidth}
                onChange={(newWidth) => handleLineWidthChange(newWidth)}
              >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
              </Slider>
            </Box>
          </VStack>
        </HStack>
      </HStack>
        <Box flex="1" bg="white" style={{ position: 'relative', width: '900px', height: '800px'  }}>
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            width='900'
            height='800'
            style={{ display: 'block', borderRadius: '8px' }}
          />
        </Box>
      </VStack>
    </Flex>
  )
};

export default CanvasPage;
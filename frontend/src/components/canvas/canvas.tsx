// import { HStack, VStack, Box, Text, Flex, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch } from "@chakra-ui/react";
// import { ChromePicker } from "react-color";
// import React, { useEffect, useState, useRef } from "react";
// import { useDraw } from "./hooks/useDraw";
// import { drawLine } from "./utils/drawLine";
// import { CanvasProps } from "../../Commons";
// import LocalStorageHandler from "../../handlers/LocalStorageHandler";

// const CanvasPage: React.FC<CanvasProps> = ({ socket }) => {
//   const [color, setColor] = useState<string>("#000");
//   const { canvasRef, onMouseDown } = useDraw(createLine);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // Create a ref for ctx
//   const [isEraserMode, setIsEraserMode] = useState(false);
//   const [lineWidth, setLineWidth] = useState(5);

//   useEffect(() => {
//     const ctx = canvasRef.current?.getContext("2d");
//     ctxRef.current = ctx as CanvasRenderingContext2D | null;

//     // Add event listener for window resize

//     socket?.emit("client-ready");

//     socket?.on("get-canvas-state", () => {
//       if (!canvasRef.current?.toDataURL()) return;
//       console.log("sending canvas state");
//       socket.emit("canvas-state", canvasRef.current.toDataURL());
//     });

//     socket?.on("canvas-state-from-server", (state: string) => {
//       const img = new Image();
//       img.src = state;
//       img.onload = () => {
//         ctx?.drawImage(img, 0, 0);
//       };
//     });

//     socket?.on("draw-line", ({ prevPoint, currentPoint, color, width }: DrawLineProps) => {
//       if (!ctx) return console.log("no ctx here");
//       drawLine({ prevPoint, currentPoint, ctx, color, width });
//     });

//     socket?.on("canvas-clear", () => {
//       clearCanvas();
//     })

//     const roomId = LocalStorageHandler.getMatchData()?.room_id
//     const savedCanvasState = LocalStorageHandler.getCanvasData(`canvas_${roomId}`);
//     if (savedCanvasState) {
//       const img = new Image();
//       img.src = savedCanvasState;
//       img.onload = () => {
//         ctx?.drawImage(img, 0, 0);
//       };
//     }

//     return () => {
//       socket?.off("draw-line");
//       socket?.off("get-canvas-state");
//       socket?.off("canvas-state-from-server");
//       socket?.off("canvas-clear");
//     };
//   }, [canvasRef]);

//   function createLine({ prevPoint, currentPoint, ctx }: Draw) {
//     // Emit the draw-line event with the updated drawing history
//     const width = lineWidth;
//     socket?.emit("draw-line", { prevPoint, currentPoint, color, width });
//     drawLine({ prevPoint, currentPoint, ctx, color, width });

//     if (canvasRef.current) {
//       const roomId = LocalStorageHandler.getMatchData()?.room_id!;
//       const key = `canvas_${roomId}`;
//       LocalStorageHandler.storeCanvasData(key, canvasRef.current.toDataURL());
//     }
//   }

//   function handleLineWidthChange(newWidth: number) {
//     setLineWidth(newWidth);
//   }

//   function toggleEraserMode() {
//     setIsEraserMode(!isEraserMode);
//     // Change the color to white when eraser mode is enabled
//     setColor(isEraserMode ? '#000000' : '#ffffff');
//   };


//   const clearCanvas = () => {
//     const ctx = ctxRef.current;
//     if (ctx) {
//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     }
//   };

//   const clearCanvasHistory = () => {
//     const roomId = LocalStorageHandler.getMatchData()?.room_id!;
//     localStorage.setItem(`canvas_${roomId}`, JSON.stringify([]));
//   }

//   return (
//     <Flex justifyContent="center" alignItems="center">
//       <VStack>
//         <HStack mr="auto" >
//           <HStack>
//             <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
//             <VStack>
//               <Button
//                 type="button"
//                 p={2}
//                 rounded="md"
//                 borderWidth={1}
//                 color="white"
//                 borderColor="white"
//                 onClick={() => {
//                   socket?.emit("canvas-clear");
//                   clearCanvas();
//                   clearCanvasHistory();
//                 }}
//               >
//                 Clear
//               </Button>
//               <HStack>
//                 <Text fontSize="md" mb={2} color={'white'}>Eraser</Text>
//                 <Switch
//                   size="sm"
//                   colorScheme="gray"
//                   color={"blue"}
//                   isChecked={isEraserMode}
//                   onChange={toggleEraserMode}
//                 />
//               </HStack>
//               <Box>
//                 <Text fontSize="md" color={"white"} mb={2}>
//                   Line Width
//                 </Text>
//                 <Slider
//                   min={5} // Set the minimum line width
//                   max={25} // Set the maximum line width
//                   value={lineWidth}
//                   onChange={(newWidth) => handleLineWidthChange(newWidth)}
//                 >
//                   <SliderTrack>
//                     <SliderFilledTrack />
//                   </SliderTrack>
//                   <SliderThumb />
//                 </Slider>
//               </Box>
//             </VStack>
//           </HStack>
//         </HStack>
//         <Box flex="1" bg="white" style={{ position: 'relative', width: '900px', height: '800px' }}>
//           <canvas
//             ref={canvasRef}
//             onMouseDown={onMouseDown}
//             width='900'
//             height='800'
//             style={{ display: 'block', borderRadius: '8px' }}
//           />
//         </Box>
//       </VStack>
//     </Flex>
//   )
// };

// export default CanvasPage;

import { HStack, VStack, Box, Text, Flex, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import React, { useEffect, useState, useRef } from "react";
import { useDraw } from "./hooks/useDraw";
import { drawLine } from "./utils/drawLine";
import { CanvasProps } from "../../Commons";
import LocalStorageHandler from "../../handlers/LocalStorageHandler";

import { Center, IconButton, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@chakra-ui/react"; import { EditIcon } from "@chakra-ui/icons";

const CanvasPage: React.FC<CanvasProps> = ({ socket }) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown } = useDraw(createLine);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // Create a ref for ctx
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      drawLine({ prevPoint, currentPoint, ctx, color, width });
    });

    socket?.on("canvas-clear", () => {
      clearCanvas();
    })

    const roomId = LocalStorageHandler.getMatchData()?.room_id
    const savedCanvasState = LocalStorageHandler.getCanvasData(`canvas_${roomId}`);
    if (savedCanvasState) {
      const img = new Image();
      img.src = savedCanvasState;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    }

    return () => {
      socket?.off("draw-line");
      socket?.off("get-canvas-state");
      socket?.off("canvas-state-from-server");
      socket?.off("canvas-clear");
    };
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    // Emit the draw-line event with the updated drawing history
    const width = lineWidth;
    socket?.emit("draw-line", { prevPoint, currentPoint, color, width });
    drawLine({ prevPoint, currentPoint, ctx, color, width });

    if (canvasRef.current) {
      const roomId = LocalStorageHandler.getMatchData()?.room_id!;
      const key = `canvas_${roomId}`;
      LocalStorageHandler.storeCanvasData(key, canvasRef.current.toDataURL());
    }
  }

  function handleLineWidthChange(newWidth: number) {
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

  const clearCanvasHistory = () => {
    const roomId = LocalStorageHandler.getMatchData()?.room_id!;
    localStorage.setItem(`canvas_${roomId}`, JSON.stringify([]));
  }

  // return (
  //   <Flex justifyContent="center" alignItems="center">
  //     <VStack>
  //       <HStack mr="auto" >
  //         <HStack>
  //           <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
  //           <VStack>
  //             <Button
  //               type="button"
  //               p={2}
  //               rounded="md"
  //               borderWidth={1}
  //               color="white"
  //               borderColor="white"
  //               onClick={() => {
  //                 socket?.emit("canvas-clear");
  //                 clearCanvas();
  //                 clearCanvasHistory();
  //               }}
  //             >
  //               Clear
  //             </Button>
  //             <HStack>
  //               <Text fontSize="md" mb={2} color={'white'}>Eraser</Text>
  //               <Switch
  //                 size="sm"
  //                 colorScheme="gray"
  //                 color={"blue"}
  //                 isChecked={isEraserMode}
  //                 onChange={toggleEraserMode}
  //               />
  //             </HStack>
  //             <Box>
  //               <Text fontSize="md" color={"white"} mb={2}>
  //                 Line Width
  //               </Text>
  //               <Slider
  //                 min={5} // Set the minimum line width
  //                 max={25} // Set the maximum line width
  //                 value={lineWidth}
  //                 onChange={(newWidth) => handleLineWidthChange(newWidth)}
  //               >
  //                 <SliderTrack>
  //                   <SliderFilledTrack />
  //                 </SliderTrack>
  //                 <SliderThumb />
  //               </Slider>
  //             </Box>
  //           </VStack>
  //         </HStack>
  //       </HStack>
  //       <Box flex="1" bg="white" style={{ position: 'relative', width: '900px', height: '800px' }}>
  //         <canvas
  //           ref={canvasRef}
  //           onMouseDown={onMouseDown}
  //           width='900'
  //           height='800'
  //           style={{ display: 'block', borderRadius: '8px' }}
  //         />
  //       </Box>
  //     </VStack>
  //   </Flex>
  // )


  return (
    <Flex justifyContent="left" position="relative">
      <Box position="absolute" top={2} right={58} zIndex="popover">
        <Popover isOpen={isOpen} onClose={onClose} >
          <PopoverTrigger>
            <IconButton
              aria-label="Toggle tools"
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
              size="lg"
              position='fixed'
            />
          </PopoverTrigger>
          <PopoverContent p={4} bg='primary.blue3'>
            <PopoverArrow bg='primary.blue3' />
            <PopoverCloseButton />
            <PopoverHeader textStyle='h1' border='0' mx={5}>Canvas Tools</PopoverHeader>
            <PopoverBody>
              <Center>
                <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
              </Center>
              <VStack spacing={4} align="stretch" m={5}>
                <HStack align="center">
                  <Text pr='15px' color="white">Eraser</Text>
                  <Switch
                    size="lg"
                    colorScheme="blue"
                    isChecked={isEraserMode}
                    onChange={toggleEraserMode}
                  />
                </HStack>

                <HStack align="center">
                  <Text color="white" pr='15px'>Line Width</Text>
                  <Slider
                    min={5}
                    max={25}
                    value={lineWidth}
                    onChange={handleLineWidthChange}
                    flex="1"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </HStack>
                <Button
                  type="button"
                  p={2}
                  colorScheme="red"
                  onClick={() => {
                    socket?.emit("canvas-clear");
                    clearCanvas();
                    clearCanvasHistory();
                  }}
                  mt={4}
                >
                  Clear Canvas
                </Button>
              </VStack>

            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <VStack>
        <Box flex="1" bg="white" style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            width='1200'
            height='1500'
            style={{ display: 'block', borderRadius: '8px' }}
          />
        </Box>
      </VStack>
    </Flex>
  )
};

export default CanvasPage;
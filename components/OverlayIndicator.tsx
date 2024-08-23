import React from "react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverlayIndicatorProps {
   textOverlays: Array<{ text: string; timestamp: number }>;
   durationInSeconds: number; // Video duration in seconds
   fps: number; // Frames per second
}

const OverlayIndicator: React.FC<OverlayIndicatorProps> = ({
   textOverlays,
   durationInSeconds,
   fps,
}) => {
   const totalFrames = durationInSeconds * fps;

   return (
      <div className="relative w-full h-4 bg-gray-200 top-4">
         {textOverlays.map(({ text, timestamp }, index) => {
            const frame = timestamp * fps;
            const position = (frame / totalFrames) * 100; // Percentage position

            return (
               <TooltipProvider key={text} delayDuration={0}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <div
                           className="absolute top-0 h-4 w-1 bg-black/50 cursor-pointer"
                           style={{ left: `${position}%` }}
                        ></div>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{text}, {timestamp} sec</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            );
         })}
      </div>
   );
};

export default OverlayIndicator;

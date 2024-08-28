"use client";

import React from "react";
import { Video, useCurrentFrame, interpolate, Easing } from "remotion";

import { TextOverlay } from "@/app/page";

interface MyCompositionProps {
   textOverlays?: Array<TextOverlay>;
}

export const MyComposition: React.FC<MyCompositionProps> = ({
   textOverlays = [],
}) => {
   const frame = useCurrentFrame();
   const fps = 30;

   return (
      <div>
         <Video src="/demo.mp4" startFrom={0} className="w-full h-full" />

         {/* Render text overlays */}
         {textOverlays.map(({ text, timestamp, font, animation, duration }, index) => {
            const startFrame = timestamp * fps;
            console.log(typeof(duration), duration);
            const endFrame = startFrame + fps * duration ; // Show text for 2 seconds (60 frames)

            if (frame < startFrame || frame > endFrame) {
               return null; 
            }

            // Interpolation logic for animations
            const opacity =
               animation === "fade"
                  ? interpolate(frame, [startFrame, endFrame], [0, 1], {
                       extrapolateRight: "clamp",
                       easing: Easing.ease,
                    })
                  : 1;

            const transform =
               animation === "slide"
                  ? `translateY(${interpolate(
                       frame,
                       [startFrame, startFrame + fps], // Animate during the first second
                       [100, 0],
                       { extrapolateRight: "clamp", easing: Easing.ease }
                    )}%)`
                  : "translateY(0%)";

            return (
               <div
                  key={index}
                  style={{
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     transform: `translate(-50%, -50%) ${transform}`,
                     fontSize: "2rem",
                     color: "black",
                     backgroundColor: "yellowgreen",
                     borderRadius: "2rem",
                     padding: "2rem",
                     opacity,
                  }}
                  className={`absolute text-white ${font}`}
               >
                  {text}
               </div>
            );
         })}
      </div>
   );
};

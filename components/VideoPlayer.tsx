"use client";

import React, { useState, FormEvent } from "react";
import { Player } from "@remotion/player";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";

import { MyComposition } from "../remotion/Composition";
import OverlayIndicator from "./OverlayIndicator";

import { TextOverlay } from "@/app/page";

interface VideoPlayerProps {
   textOverlays: TextOverlay[];
   setTextOverlays: (a: any) => void;
}

export default function VideoPlayer({
   textOverlays,
   setTextOverlays,
}: VideoPlayerProps) {
   const durationInSeconds = 12; // Duration of the demo video
   const fps = 30; // Frames per second of the video

   const handleAddOverlay = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const text = formData.get("text") as string;
      const timestamp = parseInt(formData.get("timestamp") as string, 10);
      const animation = formData.get("animation") as string;
      const font = formData.get("font") as string;

      setTextOverlays([...textOverlays, { text, timestamp, animation, font }]);
      e.currentTarget.reset();
   };

   return (
      <div className="flex flex-col items-center gap-8">
         <div className="relative w-full max-w-[1280px]">
            <Player
               component={MyComposition}
               durationInFrames={durationInSeconds * fps}
               compositionWidth={1280}
               compositionHeight={720}
               fps={fps}
               controls
               style={{ height: "60vh", width: "100%" }}
               inputProps={{ textOverlays }}
            />

            <div className="absolute bottom-0 left-0 w-full">
               <OverlayIndicator
                  textOverlays={textOverlays}
                  durationInSeconds={durationInSeconds}
                  fps={fps}
               />
            </div>
         </div>

         <h1 className="text-xl font-semibold">Add the text to the video</h1>
         <form
            className="flex gap-4 flex-wrap md:flex-nowrap"
            onSubmit={handleAddOverlay}
         >
            <Input
               type="text"
               name="text"
               placeholder="Enter overlay text"
               required
            />
            <Input
               type="number"
               name="timestamp"
               placeholder="Enter timestamp in seconds"
               required
               max={durationInSeconds}
            />

            <Select name="animation">
               <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Animation" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="fade">Fade In</SelectItem>
                  <SelectItem value="slide">Slide In</SelectItem>
               </SelectContent>
            </Select>

            <Select name="font">
               <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Font" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="font-sans">Sans-serif</SelectItem>
                  <SelectItem value="font-serif">Serif</SelectItem>
                  <SelectItem value="font-mono">Monospace</SelectItem>
               </SelectContent>
            </Select>

            <Button type="submit">Add Overlay Text</Button>
         </form>
      </div>
   );
}

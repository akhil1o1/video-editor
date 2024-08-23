"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";

export type TextOverlay = {
   text: string;
   timestamp: number;
   animation: string;
   font: string;
};

export default function Home() {
   const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);

   const handleExport = async () => {
      try {
         const response = await fetch("/api/render", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ textOverlays }),
         });

         const result = await response.json();
         if (result.success) {
            // Trigger the download of the rendered video
            window.location.href = result.url;
         } else {
            alert("Failed to export video");
         }
      } catch (error) {
         console.error("Error exporting video:", error);
      }
   };

   return (
      <>
         <header className="p-8 text-2xl font-semibold flex justify-between items-center">
            <div>Video Editor</div>
            <Button onClick={() => {}}>Export Video</Button>
         </header>
         <Separator />
         <main className="container mx-auto p-4">
            <VideoPlayer
               textOverlays={textOverlays}
               setTextOverlays={setTextOverlays}
            />
         </main>
      </>
   );
}

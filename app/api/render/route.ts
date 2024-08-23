// // app/api/render/route.ts
// import { NextResponse } from "next/server";
// import { renderMedia } from "@remotion/renderer";
// import path from "path";
// import { MyComposition } from "@/remotion/Composition";
// import { VideoConfig } from "remotion";

// export async function POST(request: Request) {
//    console.log("download request");
//    try {
//       const { textOverlays } = await request.json();

//       const outputPath = path.join(process.cwd(), "public", "out.mp4");

//       const compositionConfig: VideoConfig = {
//          width: 1280,
//          height: 720,
//          fps: 30,
//          durationInFrames: 360, // For example, 12 seconds at 30fps
//          id: "MyComp", // This should match the id in your Remotion Composition
//          defaultProps: {},
//          props: { textOverlays }, // Pass any default props here
//          defaultCodec: "h264",
//       };

//       await renderMedia({
//          composition: compositionConfig,
//          serveUrl: "http://localhost:3000",
//          codec: "h264",
//          outputLocation: outputPath,
//          inputProps: { textOverlays },
//       });

//       return NextResponse.json({ success: true, url: "/out.mp4" });
//    } catch (err: any) {
//       console.error(err);
//       return NextResponse.json({ success: false, error: err.message });
//    }
// }

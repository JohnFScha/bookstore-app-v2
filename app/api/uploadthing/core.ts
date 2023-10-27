const Books = require('../../models/bookModel.js')
import { createUploadthing, type FileRouter } from "uploadthing/next";
import connect from "@/app/utils/connect";

connect()

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }} )
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
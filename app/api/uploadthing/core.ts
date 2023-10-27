const Books = require('../../models/bookModel.js')
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { connect } from 'mongoose';

connect(process.env.MONGO_DB_CONNECT!)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    throw new Error(`Error connecting to DB: ${error}`);
  });

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
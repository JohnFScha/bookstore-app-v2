const Books = require('../../models/bookModel.js')
import { connect } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

connect(process.env.MONGO_DB_CONNECT!)
.then(() => {
  console.log("Connected to DB");
})
.catch((error) => {
  throw new Error(`Error connecting to DB: ${error}`);
});

export async function GET(response: Response) {
  const data = await Books.find();
  return Response.json({data})
}

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData()
  const title = formData.get('title')
  const author = formData.get('author')
  const publishYear = formData.get('publishYear')

  const newBook: Book = await Books.create({
    title: title,
    author: author,
    publishYear: publishYear
  })

  return NextResponse.json({message: 'Book created successfully!', newBook});
}
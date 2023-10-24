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

export async function GET(response: NextResponse) {
  try {
    const data = await Books.find();
    if(data) {
      return NextResponse.json({data})
    } else {
      return NextResponse.json({status: 404, message: 'Not found'})
    }
  } catch (error) {
    return NextResponse.json({status: 500, message: `Internal server error: ${error}`})
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData()
    const title = formData.get('title')
    const author = formData.get('author')
    const publishYear = formData.get('publishYear')
  
    const newBook: Book = await Books.create({
      title: title,
      author: author,
      publishYear: publishYear
    })

    if (newBook) {
      return NextResponse.json({message: 'Book created successfully!', newBook});
    } else {
      return NextResponse.json({status: 400, message: 'Bad request'})
    }
  } catch (error) {
    return NextResponse.json({status: 500, message: `Internal server error: ${error}`})
  }
}
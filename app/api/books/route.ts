const Books = require('../../models/bookModel.js')
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/utils/connect';

connect()

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const title = formData.get('title')
    const author = formData.get('author')
    const publishYear = formData.get('publishYear')
    const thumbnailUrl = formData.get('thumbnailUrl')
  
    const newBook: Book = await Books.create({
      title: title,
      author: author,
      publishYear: publishYear,
      thumbnailUrl: thumbnailUrl
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
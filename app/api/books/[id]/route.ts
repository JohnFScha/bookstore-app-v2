const Books = require('../../../models/bookModel.js')
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse, context: { params: { id: string } }) {
  const id = context.params.id

  try {
    const data = await Books.findById(id);
    if (!data) {
      return NextResponse.json({status: 404, message: 'Not Found'})
    } 
    return NextResponse.json({data})
  } catch (error) {
    return NextResponse.json({status: 500, message: `Internal server error: ${error}`})
  }
}

export async function DELETE(request: Request, response: NextResponse,context: { params: { id: string } }) {
  const id = context.params.id

  try {
    const res = await Books.findByIdAndDelete(id);

    if (!res) {
      return NextResponse.json({status: 400, message: 'Bad request'})
    }

    return NextResponse.json({status: 200, message: 'Book deleted successfully'})
  } catch (error) {
    return NextResponse.json({status: 500, message: `Internal server error: ${error}`})
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const id = context.params.id

  try {
    const formData = await request.formData()
    const title = formData.get('title')
    const author = formData.get('author')
    const publishYear = formData.get('publishYear')
  
    const newBook: Book = await Books.findByIdAndUpdate(id, {
      title: title,
      author: author,
      publishYear: publishYear
    })
  
    if (!newBook) {
      return NextResponse.json({status: 404, message: 'Not Found'})
    }

    return NextResponse.json({status: 200, message: newBook })    
  } catch (error) {
    return NextResponse.json({status: 500, message: `Internal server error: ${error}`})
  }
} 
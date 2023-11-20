import Books from '@/app/models/bookModel'
import { UTApi } from "uploadthing/server";
import { NextRequest, NextResponse } from 'next/server'

const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET })

// Get by id
export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
  const { title } = params
  try {
    const res = await Books.findOne({title: title})

    if (res) {
      return NextResponse.json(res)
    } else {
      return NextResponse.json({ message: `${title} not found` })
    }

  } catch (error) {
    return NextResponse.json({ message: `Internal server error:, ${error}` })
  }
}

// Delete book by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const res = await Books.findByIdAndDelete(id)

    if (res) {
      return NextResponse.json(res)
    } else {
      return NextResponse.json({ message: `${id} not found` })
    }

  } catch (error) {
    return NextResponse.json({ message: `Internal server error:, ${error}` })
  }
}

// Update by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const book = await Books.findById(id) as Book
  const formData = await request.formData()

  try {
    const file = formData.get('bookCover') as File;
    
    if (file?.size !== 0) {
      const response = await utapi.uploadFiles(file);
      const url = response.data!.url
      formData.append('thumbnailUrl', url)
    }
  
    const title = formData.get('title') as string;
    const author = formData.get('author') as string
    const publishYear = Number(formData.get('publishYear'))
    const description = formData.get('description') as string 
    const thumbnailUrl = formData.get('thumbnailUrl') as string

    const updatedBook = {
      title: title ? title : book.title ,
      author: author ? author : book.author,
      publishYear: publishYear ? publishYear : book.publishYear,
      description: description ? description : book.description, 
      thumbnailUrl: file.size !== 0 ? thumbnailUrl : book.thumbnailUrl ? book.thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
    }
    
    const response = await Books.findByIdAndUpdate(id, updatedBook)
  
    if (response) {
      return NextResponse.json({message: 'Edited Successfully', data: response})
    } else {
      return NextResponse.json({message: 'Not found'})
    };
  } catch (error) {
    return NextResponse.json({status: 500, error})
  }
}
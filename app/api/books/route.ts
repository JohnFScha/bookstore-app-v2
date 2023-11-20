import Books from '@/app/models/bookModel'
import { UTApi } from "uploadthing/server";
import dbConnect from '@/app/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET })

export async function GET(request: NextRequest) {
  await dbConnect()
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')

    if(search !== undefined) {
      const res = await Books.find({ title: { $regex: search } })
      
      if (res) {
        return NextResponse.json(res)
      } else {
        return NextResponse.json({ message: 'Not found' })
      }
    } else {
      const res = Books.find()

      if (res) {
        return NextResponse.json(res)
      } else {
        return NextResponse.json({ message: 'Not found' })
      }
    }
  } catch (error) {
    return NextResponse.json({error})
  }
}

export async function POST(request: NextRequest) {
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

    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
      description: description,
      thumbnailUrl: file.size !== 0 ? thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
    }

    const response = await Books.create(newBook)

    if (response) {
      return NextResponse.json({ message: 'Created Successfully', data: response })
    } else {
      return NextResponse.json({ message: 'Error creating book' })
    };
  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}
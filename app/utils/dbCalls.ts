import Books from "../models/bookModel"
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import dbConnect from '@/app/lib/dbConnect';

const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET })

//Get every book / limit
export async function getBooks(limit: string) {
  try {
    const res = await Books.find().limit(limit ? Number(limit) : 100)

    if (res) {
      return res
    } else {
      throw new Error('Not found')
    }

  } catch (error) {
    throw new Error(`Internal server error: ${error}`)
  }
}

// Get by id
export async function getBook(id: string) {
  try {
    const res = await Books.findById(id)

    if (res) {
      return res
    } else {
      throw new Error(`${id} not found`)
    }

  } catch (error) {
    throw new Error(`Internal server error:, ${error}`)
  }
}

// Delete book by Id
export async function deleteById(id: string) {
  const response = await Books.findByIdAndDelete(id)

  if (response) {
    return redirect('/')
  } else {
    throw new Error('Error deleting book')
  }
}

// Create new book
export async function createBook(formData: FormData) {
  'use server';
  await dbConnect()

  const file = formData.get('bookCover') as File;

  if (file?.name !== 'undefined') {
    const response = await utapi.uploadFiles(file);
    const url = response.data!.url
    formData.append('thumbnailUrl', url)
  }

  const title = formData.get('title') as string;
  const author = formData.get('author') as string
  const publishYear = Number(formData.get('publishYear'))
  const thumbnailUrl = formData.get('thumbnailUrl') as string

  const newBook = await Books.create({
    title: title,
    author: author,
    publishYear: publishYear,
    thumbnailUrl: thumbnailUrl !== null ? thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
  })

  if (newBook) {
    redirect('/')
  } else {
    throw new Error('Error creating book')
  }
}

// Update a book by id
export async function editBook(formData: FormData, id: string) {
  await dbConnect()
  const file = formData.get('bookCover') as File;

  if (file?.name !== 'undefined') {
    const response = await utapi.uploadFiles(file);
    const url = response.data!.url
    formData.append('thumbnailUrl', url)
  }

  const title = formData.get('title') as string;
  const author = formData.get('author') as string
  const publishYear = Number(formData.get('publishYear'))
  const thumbnailUrl = formData.get('thumbnailUrl') as string

  const updatedBook = {
    title: title,
    author: author,
    publishYear: publishYear,
    thumbnailUrl: thumbnailUrl !== null ? thumbnailUrl : 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
  }

  const response = await Books.findByIdAndUpdate(id, updatedBook)

  if (response) {
    redirect('/')
  } else {
    throw new Error('Error updating book')
  };
}
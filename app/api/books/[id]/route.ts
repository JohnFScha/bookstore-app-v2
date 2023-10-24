const Books = require('../../../models/bookModel.js')

export async function GET(request: Request, context: { params: { id: string } }) {
  const id = context.params.id
  const data = await Books.findById(id);
  return Response.json({ data })
} 

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const id = context.params.id
  await Books.findByIdAndDelete(id);
  return new Response('Book deleted successfully')
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const id = context.params.id
  const formData = await request.formData()
  const title = formData.get('title')
  const author = formData.get('author')
  const publishYear = formData.get('publishYear')

  const newBook: Book = await Books.findByIdAndUpdate(id, {
    title: title,
    author: author,
    publishYear: publishYear
  })

  return Response.json({ newBook })
} 
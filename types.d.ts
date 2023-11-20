type Book = {
  _id: string
  title: string,
  author: string,
  description: string,
  publishYear: number,
  thumbnailUrl: string,
  createdAt: Date,
  updatedAt: Date
}

type SearchParams = {
  search: string,
}
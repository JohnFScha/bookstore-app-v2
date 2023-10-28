import mongoose from 'mongoose';

export interface Book extends mongoose.Document {
  _id: string
  title: string,
  author: string,
  description?: string,
  publishYear: number,
  thumbnailUrl?: string,
  createdAt: Date,
  updatedAt: Date
}

const Books = new mongoose.Schema<Book>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corporis repellendus, dolor animi deleniti nisi tenetur. At dolores voluptates ipsa nulla. Fugiat explicabo quis debitis veritatis quod officia voluptate dolorem? Quae corrupti magni iure excepturi earum reprehenderit maiores ipsa rerum, nam consectetur molestiae sapiente esse sunt laborum deserunt, quibusdam officiis consequatur. In iusto, repellendus quis alias laboriosam corporis. Corporis, eaque.'
  },
  publishYear: {
    type: Number,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: 'https://utfs.io/f/ccd48a8a-f0a7-4323-add6-fa826698f381-9xntgd.jpg'
  }},
  {
    timestamps: true,
  }
)

export default mongoose.models.Books || mongoose.model<Book>("Books", Books);
import mongoose from 'mongoose';

export default async function connect() {
  try {
    const response = await mongoose.connect(process.env.MONGO_DB_CONNECT as string)

    if (response) {
      console.log('Connected to DB')
    }

  } catch (error) {
    console.log('Error connecting to db', error)
  }
}
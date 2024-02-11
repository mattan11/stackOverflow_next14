import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')

  if (isConnected) {
    return console.log('MongoDB is already connected')
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devFlow',
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })

    isConnected = Boolean(db.connections[0].readyState)

    console.log('MongoDB is connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

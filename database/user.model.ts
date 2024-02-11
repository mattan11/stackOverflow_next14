import { Schema, model, models, Document } from 'mongoose'

// Define the interface for the user document
interface IUser extends Document {
  clerkId: string
  name: string
  username: string
  email: string
  password?: string
  bio?: string
  picture: string
  location?: string
  portfolioWebsite?: string
  reputation?: number
  joinDate: Date
  saved: Schema.Types.ObjectId[]
  joindedAt: Date
}

const userSchema: Schema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  joindedAt: { type: Date, default: Date.now },
})

const User = models.User || model<IUser>('User', userSchema)

export default User

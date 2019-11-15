import { model, Schema, Document } from 'mongoose'

export interface IUser extends Document {
  device_token: string
  subscription?: string[]
}

const userSchema = new Schema(
  {
    subscription: { type: [String] },
    device_token: { type: String, unique: true }
  },
  { timestamps: true }
)

// * Unique Mongoose Handling
userSchema.post('save', function(error: any, doc: any, next: Function) {
  if (error) return next(error)
  next()
})

export default model<IUser>('Users', userSchema)

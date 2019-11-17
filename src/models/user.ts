import { model, Schema, Document } from 'mongoose'

export interface IUser {
  device_token: string
  subscription: string[]
}

export interface IUserModel extends IUser, Document {}

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

export default model<IUserModel>('Users', userSchema)

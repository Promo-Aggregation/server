import { compare, genSalt, hash } from 'bcryptjs'

export const encrypt = async (password: string) => {
  const salt = await genSalt()
  return await hash(password, salt)
}

export const check = async (password: string, hashedPassword: string) =>
  await compare(password, hashedPassword)

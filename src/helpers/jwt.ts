import { sign, verify } from 'jsonwebtoken'

const secret = process.env.JWT_KEY || '12345'

export const createToken = (payload: object) => sign(payload, secret)
export const verifyToken = (token: string) => verify(token, secret)

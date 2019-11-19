import { model, Schema, Document } from 'mongoose'

export interface IPromo {
  title: string
  date: string
  detailUrl: string
  imageUrl: string
  kodePromo: string
  tags: string[]
  detail: {
    syaratKetentuan: string[]
    cara: string[]
  }
  minimalTransaction: number
  cashback: number
}

export interface IPromoModel extends IPromo, Document {}

const promosSchema = new Schema(
  {
    title: { type: String },
    date: { type: String },
    detailUrl: { type: String },
    imageUrl: { type: String },
    kodePromo: { type: String },
    tags: [
      {
        type: String
      }
    ],
    detail: { syaratKetentuan: [], cara: [] },
    minimalTransaction: { type: Number },
    cashback: { type: Number }
  },
  { timestamps: true, versionKey: false }
)

const Promo = model<IPromoModel>('Promos', promosSchema)
const NewPromo = model<IPromoModel>('NewPromos', promosSchema)

export { Promo, NewPromo }

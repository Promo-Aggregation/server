import { model, Schema, Document } from 'mongoose'

export interface IPromo {
  title: string
  date: string
  detailUrl: string
  imageUrl: string
  kodePromo: string
}

export interface IPromoModel extends IPromo, Document {}

const promosSchema = new Schema(
  {
    title: { type: String },
    date: { type: String },
    detailUrl: { type: String },
    imageUrl: { type: String },
    kodePromo: { type: String }
  },
  { timestamps: true, versionKey: false }
)

const Promo = model<IPromoModel>('Promos', promosSchema)
const NewPromo = model<IPromoModel>('NewPromos', promosSchema)

export { Promo, NewPromo }

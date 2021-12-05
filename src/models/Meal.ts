import { Drink } from './Drink'

export interface Meal {
  id: string
  title: string
  starter: string
  desert?: string
  price: number
  labels: string[]
  img: string
  drinks: Drink[]
}

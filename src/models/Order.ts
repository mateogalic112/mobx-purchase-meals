import { Drink } from './Drink'
import { Meal } from './Meal'

export interface Order {
  meal: Meal
  drink: Drink | null | undefined
}

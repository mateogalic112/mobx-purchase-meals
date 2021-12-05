import { Label } from './Label'
import { Meal } from './Meal'

export interface APIResponse {
  labels: Label[]
  meals: Meal[]
}

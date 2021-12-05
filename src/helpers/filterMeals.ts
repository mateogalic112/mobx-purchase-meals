import { Label } from '../models/Label'
import { Meal } from '../models/Meal'

export default function (label: Label, meals: Meal[]): Meal[] {
  if (!meals) return []

  if (label.label === 'All') return meals

  return meals.filter((meal) => meal.labels.includes(label.id))
}

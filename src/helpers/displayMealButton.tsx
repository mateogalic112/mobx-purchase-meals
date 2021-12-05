import { Button } from 'react-bootstrap'
import { Drink } from '../models/Drink'
import { Meal } from '../models/Meal'
import { Passenger } from '../models/Passenger'

export default function (
  meal: Meal,
  isMealSelected: boolean,
  passenger: Passenger | null,
  selectedDrink: Drink | null | undefined,
  orderMeal: (meal: Meal, selectedDrink: Drink | null | undefined) => void,
  removeMeal: () => void,
  updateMeal: (selectedDrink: Drink | null | undefined) => void,
): React.ReactNode {
  switch (true) {
    case isMealSelected && passenger?.order?.drink?.id !== selectedDrink?.id:
      return (
        <Button variant="primary" onClick={() => updateMeal(selectedDrink)}>
          Update
        </Button>
      )
    case isMealSelected:
      return (
        <Button variant="light" onClick={removeMeal}>
          Unselect
        </Button>
      )
    default:
      return (
        <Button
          variant="primary"
          onClick={() => orderMeal(meal, selectedDrink)}
        >
          Select
        </Button>
      )
  }
}

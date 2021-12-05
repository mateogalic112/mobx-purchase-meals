import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import displayMealButton from '../helpers/displayMealButton'
import { Drink } from '../models/Drink'
import { Meal } from '../models/Meal'
import { Passenger } from '../models/Passenger'

const MealCard = ({
  meal,
  orderMeal,
  mealDrinkSelected,
  isMealSelected,
  removeMeal,
  updateMeal,
  passenger,
}: {
  meal: Meal
  orderMeal: (meal: Meal, drink: Drink | null | undefined) => void
  removeMeal: () => void
  updateMeal: (drink: Drink | null | undefined) => void
  mealDrinkSelected: Drink | null | undefined
  isMealSelected: boolean
  passenger: Passenger | null
}) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null | undefined>(
    mealDrinkSelected,
  )

  const handleClick = (drink: Drink): void => {
    if (drink.id === selectedDrink?.id) {
      setSelectedDrink(null)
    } else {
      setSelectedDrink(drink)
    }
  }

  const calculateMealPrice = (
    drink: Drink | null | undefined,
    mealPrice: number,
  ): number => {
    if (!drink) return mealPrice

    return drink.price + mealPrice
  }

  return (
    <Card
      className="meal-card mb-4"
      style={{ border: isMealSelected ? '2px solid red' : '' }}
    >
      <Card.Img variant="top" src={meal.img} />
      <Card.Body>
        <Card.Title>
          {meal.title}
          {selectedDrink ? ' + drink' : ''}
        </Card.Title>
        {meal.starter && (
          <p className="description"> Starter: {meal.starter}</p>
        )}
        {meal.desert && <p className="description"> Desert: {meal.desert}</p>}
        {selectedDrink && (
          <p className="description">Selected drink: {selectedDrink.title}</p>
        )}
        <ul className="drink-list">
          {meal.drinks.length > 0 &&
            meal.drinks.map((drink) => (
              <li
                key={drink.id}
                style={{
                  border:
                    selectedDrink?.id === drink.id
                      ? '1px solid red'
                      : '1px solid grey',
                }}
                onClick={() => handleClick(drink)}
              >
                <img
                  src={`drinks/${drink.title.toLowerCase()}.jpeg`}
                  className="drink-image"
                />
              </li>
            ))}
        </ul>
        <p>
          Price:{' '}
          <b>{calculateMealPrice(selectedDrink, meal.price).toFixed(2)}€</b>
        </p>
        {displayMealButton(
          meal,
          isMealSelected,
          passenger,
          selectedDrink,
          orderMeal,
          removeMeal,
          updateMeal,
        )}
      </Card.Body>
    </Card>
  )
}

export default MealCard

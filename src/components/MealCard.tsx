import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Drink } from '../models/Drink'
import { Meal } from '../models/Meal'

const MealCard = ({
  meal,
  orderMeal,
  mealDrinkSelected,
  isMealSelected,
  removeMeal,
}: {
  meal: Meal
  orderMeal: (meal: Meal, drink: Drink | null | undefined) => void
  removeMeal: () => void
  mealDrinkSelected: Drink | null | undefined
  isMealSelected: boolean
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
      className="mb-4"
      style={{ border: isMealSelected ? '1px solid red' : '' }}
    >
      <Card.Img
        variant="top"
        src={meal.img}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <Card.Body>
        <Card.Title>
          {meal.title}
          {selectedDrink ? ' + drink' : ''}
        </Card.Title>
        {meal.starter && (
          <p style={{ marginBottom: '0' }}> Starter: {meal.starter}</p>
        )}
        {meal.desert && (
          <p style={{ marginBottom: '0' }}> Desert: {meal.desert}</p>
        )}
        {selectedDrink && (
          <p style={{ marginBottom: '0' }}>
            {' '}
            Selected drink: {selectedDrink.title}
          </p>
        )}
        <ul
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {meal.drinks.length > 0 &&
            meal.drinks.map((drink) => (
              <li
                style={{
                  border:
                    selectedDrink?.id === drink.id
                      ? '1px solid red'
                      : '1px solid grey',
                  listStyle: 'none',
                }}
                onClick={() => handleClick(drink)}
              >
                <img
                  src={`drinks/${drink.title.toLowerCase()}.jpeg`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                  }}
                />
              </li>
            ))}
        </ul>
        <p>
          Price:{' '}
          <b>{calculateMealPrice(selectedDrink, meal.price).toFixed(2)}€</b>
        </p>
        {isMealSelected ? (
          <Button variant="light" onClick={removeMeal}>
            Unselect
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => orderMeal(meal, selectedDrink)}
          >
            Select
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default MealCard

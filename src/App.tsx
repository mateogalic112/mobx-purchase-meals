import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import FilterLabel from './components/FilterLabel'
import MealCard from './components/MealCard'
import { Label } from './models/Label'
import { Meal } from './models/Meal'
import store, { BASE_LABEL } from './mobx/store'
import { observer } from 'mobx-react-lite'
import { Passenger } from './models/Passenger'
import PassengerCard from './components/PassengerCard'

const filterMeals = (label: Label, meals: Meal[]): Meal[] => {
  if (!meals) return []

  if (label.label === 'All') return meals

  return meals.filter((meal) => meal.labels.includes(label.id))
}

function App() {
  const [selectedLabel, setSelectedLabel] = useState(BASE_LABEL)
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    () => (store.passengers.length > 0 ? store.passengers[0] : null),
  )

  useEffect(() => {
    store.onLoad(process.env.REACT_APP_BASE_URL as string)
  }, [])

  const handleClick = (label: Label) => {
    setSelectedLabel(label)
  }

  const handleSelectPassenger = (passenger: Passenger) => {
    setSelectedPassenger(passenger)
  }

  if (store.isLoading) return <h1>Loading....</h1>

  return (
    <div className="app">
      <Container className="mt-4">
        <Row>
          <Col>
            <div>
              <Container>
                <Row className="mb-4">
                  <Col>
                    {store.labels.length > 0 &&
                      store.labels.map((label) => (
                        <FilterLabel
                          key={label.id}
                          label={label}
                          selectedLabel={selectedLabel}
                          handleClick={handleClick}
                        />
                      ))}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {filterMeals(selectedLabel, store.meals).map((meal) => (
                      <MealCard
                        key={`${meal.id}-${selectedLabel.id}-${selectedPassenger?.id}`}
                        meal={meal}
                        isMealSelected={
                          selectedPassenger?.order?.meal.id === meal.id
                        }
                        mealDrinkSelected={
                          selectedPassenger?.order?.meal.id === meal.id
                            ? selectedPassenger?.order?.drink
                            : null
                        }
                        orderMeal={(meal, drink) =>
                          store.createOrder(selectedPassenger, meal, drink)
                        }
                        removeMeal={() =>
                          store.removeOrder(selectedPassenger?.id)
                        }
                      />
                    ))}
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col>
            <h5 className="my-2 mb-4">Select meal</h5>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div>
                    <h6>Riga - St Petersburg</h6>
                    <p>Flight duration: 3h 45min</p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {store?.passengers.length > 0 &&
                    store.passengers.map((passenger) => (
                      <PassengerCard
                        key={passenger.id}
                        passenger={passenger}
                        handleSelectPassenger={handleSelectPassenger}
                        selectedPassengerId={selectedPassenger?.id}
                      />
                    ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                justifyContent: 'space-between',
              }}
            >
              <p className="mt-4">Total for all passengers:</p>
              <h3 style={{ margin: '0' }}>
                {store.calculateTotalPrice().toFixed(2)}€
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default observer(App)

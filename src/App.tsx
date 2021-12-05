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
import filterMeals from './helpers/filterMeals'
import './App.css'
import { Drink } from './models/Drink'

function App() {
  const [selectedLabel, setSelectedLabel] = useState(BASE_LABEL)
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    () => (store.passengers.length > 0 ? store.passengers[0] : null),
  )

  useEffect(() => {
    store.onLoad(process.env.REACT_APP_BASE_URL as string)
  }, [])

  const handleSelectLabel = (label: Label) => {
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
                          handleClick={handleSelectLabel}
                        />
                      ))}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {filterMeals(selectedLabel, store.meals).map(
                      (meal: Meal) => (
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
                          orderMeal={(
                            meal: Meal,
                            drink: Drink | null | undefined,
                          ) =>
                            store.createOrder(selectedPassenger, meal, drink)
                          }
                          removeMeal={() =>
                            store.removeOrder(selectedPassenger?.id)
                          }
                          updateMeal={(drink: Drink | null | undefined) =>
                            store.updateOrder(selectedPassenger?.id, drink)
                          }
                          passenger={selectedPassenger}
                        />
                      ),
                    )}
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
            <div className="price-container">
              <p className="mt-4">Total for all passengers:</p>
              <h3>{store.calculateTotalPrice().toFixed(2)}€</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default observer(App)

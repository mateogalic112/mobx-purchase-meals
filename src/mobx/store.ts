import { makeAutoObservable } from 'mobx'
import { APIResponse } from '../models/APIResponse'
import { Drink } from '../models/Drink'
import { Label } from '../models/Label'
import { Meal } from '../models/Meal'
import { Order } from '../models/Order'
import { Passenger } from '../models/Passenger'

export const BASE_LABEL: Label = {
  id: 'all',
  label: 'All',
}

class Store {
  labels: Label[] = []
  meals: Meal[] = []
  passengers: Passenger[] = [
    {
      id: '1',
      type: 'adult',
      order: null,
    },
    {
      id: '2',
      type: 'adult',
      order: null,
    },
  ]
  isLoading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  onLoad(url: string) {
    this.isLoading = true
    fetch(url)
      .then((res) => res.json())
      .then((data: APIResponse) => {
        this.labels = [BASE_LABEL, ...data.labels]
        this.meals = data.meals
      })
      .catch((_) => {
        this.labels = [BASE_LABEL]
        this.meals = []
      })
    this.isLoading = false
  }

  createOrder(
    passenger: Passenger | null,
    meal: Meal,
    drink: Drink | null | undefined,
  ): void {
    if (!passenger) return

    const newOrder: Order = { meal, drink }
    passenger.order = newOrder
  }

  removeOrder(passengerId: string | null | undefined): void {
    if (!passengerId) return

    this.passengers.map((passenger: Passenger) => {
      if (passenger.id === passengerId) {
        passenger.order = null
        return passenger
      }
      return passenger
    })
  }

  updateOrder(
    passengerId: string | null | undefined,
    selectedDrink: Drink | null | undefined,
  ): void {
    if (!passengerId) return

    this.passengers.map((passenger: Passenger) => {
      if (passenger.id === passengerId && passenger.order) {
        passenger.order.drink = selectedDrink
        return passenger
      }
      return passenger
    })
  }

  calculateTotalPrice(): number {
    return this.passengers.reduce((acc: number, passenger: Passenger) => {
      if (passenger?.order) {
        return (
          acc + passenger.order.meal.price + (passenger.order.drink?.price || 0)
        )
      }
      return acc
    }, 0)
  }
}

const store = new Store()
export default store

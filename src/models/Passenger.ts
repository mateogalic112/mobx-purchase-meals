import { Order } from './Order'

export interface Passenger {
  id: string
  type: 'adult' | 'child'
  order: Order | null | undefined
}

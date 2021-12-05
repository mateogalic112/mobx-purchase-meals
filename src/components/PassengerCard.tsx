import { Passenger } from '../models/Passenger'

const PassengerCard = ({
  passenger,
  handleSelectPassenger,
  selectedPassengerId,
}: {
  passenger: Passenger
  handleSelectPassenger: (passenger: Passenger) => void
  selectedPassengerId: string | null | undefined
}) => {
  return (
    <div
      key={passenger.id}
      style={{
        opacity: selectedPassengerId === passenger.id ? '1' : '0.35',
      }}
      onClick={() => handleSelectPassenger(passenger)}
      className="passenger-card p-2"
    >
      <p>{passenger.type}</p>
      <span
        style={{
          color: selectedPassengerId !== passenger.id ? 'grey' : 'black',
        }}
      >
        {selectedPassengerId !== passenger.id ? 'Not selected' : 'Select meal'}
      </span>
    </div>
  )
}

export default PassengerCard

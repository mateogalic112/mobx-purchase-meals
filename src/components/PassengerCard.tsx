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
        alignItems: 'center',
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-around',
        border: '1px solid black',
        cursor: 'pointer',
        marginBottom: '1rem',
        opacity: selectedPassengerId === passenger.id ? '1' : '0.35',
      }}
      onClick={() => handleSelectPassenger(passenger)}
      className="p-2"
    >
      <p style={{ marginBottom: 0 }}>{passenger.type}</p>
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

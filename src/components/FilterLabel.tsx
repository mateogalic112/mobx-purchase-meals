import { Badge } from 'react-bootstrap'
import { Label } from '../models/Label'

const FilterLabel = ({
  label,
  handleClick,
  selectedLabel,
}: {
  label: Label
  handleClick: (label: Label) => void
  selectedLabel: Label
}) => {
  return (
    <Badge
      onClick={() => handleClick(label)}
      className="p-2 m-1"
      pill
      bg={selectedLabel.id === label.id ? 'info' : 'light'}
      text="dark"
      style={{ cursor: 'pointer' }}
    >
      {label.label}
    </Badge>
  )
}

export default FilterLabel

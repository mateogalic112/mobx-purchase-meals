import { Pagination } from 'react-bootstrap'

const Paginate = ({
  currentPage,
  totalPages,
  changePage,
}: {
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
}) => {
  return (
    <Pagination>
      {Array.from(Array(totalPages).keys()).map((number: number) => (
        <Pagination.Item
          key={number + 1}
          active={number + 1 === currentPage}
          onClick={() => changePage(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default Paginate

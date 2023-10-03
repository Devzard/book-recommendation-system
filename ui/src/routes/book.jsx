import { useParams, Link } from 'react-router-dom'

export default function Book() {
  const { book_name } = useParams()
  return (
    <div className='flex flex-col'>
      {book_name}
    </div>
  )
}

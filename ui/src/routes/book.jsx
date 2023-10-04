import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import recommendBoooks from '../utilities/fetchRecommendations'
import BookCard from '../components/bookCard'

export default function Book() {
  const [recommendedBooksData, setRecommendedBooksData] = useState([])
  const [book, setBook] = useState({})
  const { book_name } = useParams()

  useEffect(() => {
    (async () => {
      let res = await recommendBoooks(book_name)
      setRecommendedBooksData(res.recommendation)
      setBook(res.book)
    })()
  }, [book_name])

  return (
    <div className='flex flex-col h-inherit overflow-y-auto'>
      <BookCard book={book} />
      {console.log(recommendedBooksData)}
      {recommendedBooksData && recommendedBooksData.length === 0 ? <h1 className='text-2xl text-center p-2 font-bold'>No similar books found</h1> : <h1 className='text-2xl text-center p-2 font-bold'>Similar books</h1>}
      <div className='flex'>
        {recommendedBooksData && recommendedBooksData.map((book, index) => (
          <Link to={`/book/${book.book_name}`} key={index} className='hover:bg-blue-100 bg-white grow p-1'>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  )
}

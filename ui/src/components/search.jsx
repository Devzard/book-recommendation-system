import { useContext, useState } from 'react'

import { AppContext } from '../routes/root'
import fetchBooks from "../utilities/fetchBooks"
import Loader from "./loader"

export default function Search(props) {
    const [searchText, setSearchText] = useContext(AppContext).search
    const [bookData, setBookData] = useContext(AppContext).bookData
    const [isLoading, setIsLoading] = useState(false)

    const searchHandler = async () => {
        if (searchText === '' || !searchText) {
            setBookData([])
            return
        }
        setIsLoading(true);
        let book_data = await fetchBooks(searchText)
        setBookData(book_data)
        setIsLoading(false)
    }

    return (
        <div>
            <input
                type='text'
                className='w-full p-2 rounded border border-gray-300'
                placeholder='Search'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <button className='w-full p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600' onClick={searchHandler}>
                {isLoading ? <Loader/> : 'Search'}
            </button>
        </div>
    )
}

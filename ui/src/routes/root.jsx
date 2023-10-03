import { createContext, useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

import Search from "../components/search";
import BookCard from "../components/bookCard";
import popularBooks from "../utilities/popularBooks"

export const AppContext = createContext();

export default function Root() {
  let location = useLocation()
  const [searchText, setSearchText] = useState("");
  const [bookData, setBookData] = useState([]);
  const [popularBooksData, setPopularBooksData] = useState([]);

  useEffect(() => {
    (async () => {
      if (location.pathname === '/') {
        setPopularBooksData(await popularBooks())
      }
    })()
  }, [location]);

  return (
    <AppContext.Provider value={{
      search: [searchText, setSearchText],
      bookData: [bookData, setBookData]
    }}>
      <div className='flex h-screen'>

        {/* Left sidebar */}
        <div className='w-1/5 h-full bg-slate-100'>
          <div className="h-1/6 p-2">
            <Search />
          </div>
          <div className="h-5/6 overflow-x-hidden overflow-y-auto">
            {bookData && bookData.map((book, index) => (
              <NavLink to={`/book/${book.book_name}`} key={index} className={({ isActive, isPending }) =>
                isActive ? 'bg-blue-100' : isPending ? 'bg-slate-300' : 'bg-white'
              }>
                <BookCard book={book} />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Main display section */}
        <div className='w-4/5 p-2 h-full'>
          {location.pathname !== '/' ? (
            <div className=''>
              <NavLink to='/' className='w-16 p-2 py-1 mt-2 text-black hover:bg-blue-500 hover:text-white rounded border'>Home</NavLink>
            </div>
          ) : (
            <div className='w-full h-full overflow-y-auto p-2 text-black rounded border bg-slate-100'>
              <h1 className='text-2xl text-center p-2 font-bold'>Popular Books</h1>
              <div className="flex flex-wrap">
                {popularBooksData && popularBooksData.map((book, index) => (
                  <NavLink to={`/book/${book['Book-Title']}`} key={index} className='hover:bg-blue-100 bg-white grow m-1'>
                    <BookCard book={{book_name:book['Book-Title'], book_author:book['Book-Author'], thumbnail:book['Image-URL-M']}} />
                  </NavLink>
                ))}
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  )
}

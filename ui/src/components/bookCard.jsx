export default function BookCard({book}) {
  return (
    <div className="p-2 bg-inherit py-4 m-1 flex flex-col items-center">
      <div className="h-30">
        <img src={book.thumbnail} alt={book.book_name} />
      </div>
      <h1 className="font-semibold text-center">{book.book_name}</h1>
      <h3 className="text-sm text-center">{book.book_author}</h3>
    </div>
  )
}

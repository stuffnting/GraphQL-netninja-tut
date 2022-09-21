import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";
import BookList from "./BookList";

function BookDetails({ id }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id },
  });

  if (!id) return <p>No book selected.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  const { name, genre, author } = data.book;

  return (
    <div id="book-details-list">
      <h2>{name}</h2>
      <p>Genre: {genre}</p>
      <p>Author: {author.name}</p>
      <p>Other books by author:</p>
      <ul className="other-books">
        {author.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;

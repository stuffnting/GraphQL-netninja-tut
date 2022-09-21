import { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="book-list">
      <ul>
        {data.books.map(({ id, name, genre, author }) => (
          <li key={id} onClick={(e) => setSelected(id)}>
            {name}
          </li>
        ))}
      </ul>
      <div id="book-details">
        <BookDetails id={selected} />
      </div>
    </div>
  );
}

export default BookList;

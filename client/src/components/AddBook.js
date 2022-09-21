import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const {
    loading: loadingAuth,
    error: errorAuth,
    data: dataAuth,
  } = useQuery(getAuthorsQuery);

  const [addBook, { data: dataMu, loading: loadingMu, error: errorMu }] =
    useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  if (loadingAuth) return <option disabled>Loading authors</option>;
  if (errorAuth) return <p>Error :(</p>;

  if (loadingMu) return "Submitting...";
  if (errorMu) return `Submission error! ${errorMu.message}`;

  const submitAddBookForm = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <div className="AddBook">
      <form id="add-book" onSubmit={(e) => submitAddBookForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={() => setName("")}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            onClick={() => setGenre("")}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            <option>Select author</option>
            {dataAuth.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default AddBook;

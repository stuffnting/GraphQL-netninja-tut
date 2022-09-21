import { ApolloProvider } from "@apollo/client";
import client from "./client";

// Components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;

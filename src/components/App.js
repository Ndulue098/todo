import { TodoProviders } from "../context/TodoContext";
import Footer from "./Footer";
import Form from "./Form";
import Head from "./Head";
import TodoList from "./TodoList";

export default function App() {
  return (
    <TodoProviders>
      <div className="container">
        <Head />

        <Form />
        <TodoList />
        <Footer />

        <p className="drag">Drag and drop to reorder list</p>
      </div>
    </TodoProviders>
  );
}

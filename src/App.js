import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const reducer = (state = [], action) => {};

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <form>
        <button id="reset">RESET</button>
        <input type="text" placeholder="Write to do" />
        <button>Add</button>
      </form>
      <ul></ul>
    </div>
  );
}

export default App;

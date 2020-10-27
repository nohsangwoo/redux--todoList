import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const resetBTN = document.getElementById("reset");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const RESET_TODO = "RESET_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const resetTodo = () => {
  return {
    type: RESET_TODO,
  };
};

const reducer = (state = [], action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDos) => toDos.id !== action.id);
    case RESET_TODO:
      return (state = []);
    default:
      return state;
  }
};

const store = createStore(reducer);
// store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const dispatchResetToDo = () => {
  store.dispatch(resetTodo());
};

// submit시 불러오는 함수
// 입력된 텍스트의 값을 ul 리스트로 정리하여 화면에 표시
const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

const handleRESET = (e) => {
  e.preventDefault();
  dispatchResetToDo();
};

const paintToDos = () => {
  const toDos = store.getState();

  // ul태그가 이미 가지고있는 li태그를 repainting 하기때문에 해당 기능을 막으려고 초기화
  ul.innerHTML = "";

  // toDos의 배열만큼 반복한다.
  toDos.forEach((toDo) => {
    // li태그를 가상의 공간에 하나 만들어둔다
    const li = document.createElement("li");

    // 가상의 버튼을 만들고
    const btn = document.createElement("button");
    // 버튼의 text는 DEL
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);

    // 만들어진 li 태그의 id는 toDo.id로 할당
    li.id = toDo.id;
    // 만들어진 li 태그안의 내용을 toDo.text로 삽입
    li.innerText = toDo.text;

    // li에 버튼을 추가
    li.append(btn);
    // 위에서 완성된 li태그를 ul태그에 추가한다.
    ul.append(li);
  });
};

store.subscribe(paintToDos);

form.addEventListener("submit", onSubmit);

resetBTN.addEventListener("click", handleRESET);

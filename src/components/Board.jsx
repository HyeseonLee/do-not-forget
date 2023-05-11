import React, { useState } from "react";

export default function Board() {
  // ui의 변화가 있는 것들은 다 state로 관리한다.
  let nextId = 0;

  function addId() {
    console.log("ejgo ");
    nextId++;
    console.log(nextId);
  }
  const [items, setItems] = useState([
    {
      id: "",
      date: "",
      text: "",
      completed: "",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleTodoTextChange(e) {
    console.log(e.target.value);
    setInputValue(e.target.value);
    // setItems({ ...items, text: e.target.value });
    // console.log(items);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    let date = new Date();
    date = date.toDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    setInputValue("");
    console.log("iv", inputValue);
    setItems((items) => [
      ...items,
      { id: addId(), date: date, text: inputValue, completed: false },
    ]);

    console.log("최종 제출 item", items);
  }

  return (
    <>
      <div className="w-60 h-72 bg-pink-400">
        <div>카테고리</div>
        <div>
          {items.map((item) => (
            <>
              <p>{item.id}</p>
              <p>{item.date}</p>
              <p>{item.text}</p>
              <p>{item.completed}</p>
            </>
          ))}
        </div>
        <div>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              value={inputValue}
              onChange={handleTodoTextChange}
            />
            <button>+</button>
          </form>
        </div>
      </div>
    </>
  );
}

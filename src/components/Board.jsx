import React, { useState } from "react";

export default function Board() {
  // ui의 변화가 있는 것들은 다 state로 관리한다.

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(1);

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
    console.log("iv", inputValue);
    setItems((items) => [
      ...items,
      {
        id: nextId,
        date: date,
        text: inputValue,
        completed: false,
      },
    ]);
    setNextId((nextId) => nextId + 1);
    setInputValue("");

    console.log("최종 제출 item", items);
  }

  function handleChecked(itemId) {
    // items에서 itemId와 일치한 것을 찾고,
    // check상태 바꾸기

    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  }
  function handleDeleted(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }
  return (
    <>
      <div className="w-96 h-96 bg-pink-400">
        <div>카테고리</div>
        <div className="p-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <div
                className="w-3 h-3 aspect-squared bg-white mr-2 flex justify-center items-center p-2"
                onClick={() => handleChecked(item.id)}
              >
                {item.completed ? "v" : undefined}
              </div>
              {item.completed ? (
                <p className="line-through">{item.text}</p>
              ) : (
                <p>{item.text}</p>
              )}
              <p>{item.date}</p>

              <div
                className="w-3 h-3 aspect-squared bg-white mr-2 flex justify-center items-center p-2"
                onClick={() => handleDeleted(item.id)}
              >
                T
              </div>
            </div>
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

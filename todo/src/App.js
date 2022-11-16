import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");


  useState(() => {
    const temp = localStorage.getItem("todos")
    const loadeTodos = JSON.parse(temp);

    if (loadeTodos) {
      setTodo(loadeTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todo)
    localStorage.setItem("todos", temp)
  }, [todo])



  const handleCreate = (e) => {

    e.preventDefault();

    let obj = {
      id: new Date().getTime(),
      name: value
    }

    setTodo([...todo].concat(obj));
    setValue("")
  }

  const handleDelete = (index) => {

    const newTodo = [...todo].filter((items) => items.id !== index);
    setTodo(newTodo)
  }

  const editTodo = (index) => {

    const updatedTodo = [...todo].map((item) => {
      if (item.id === index) {
        item.name = editingText
      }

      return item
    })

    setTodo(updatedTodo);
    setTodoEditing(null);
    setEditingText("")

  }

  return (
    <>
      <div className='headerStyle'>
        <h1>TODO</h1>
      </div>

      <div className='outFormStyle'>
       
        <form action="" className='formStyle'>
          <div>
            <input type="text" name="" id="" onChange={(e) => setValue(e.target.value)} value={value} />
          </div>
          <div>
            <button >Create</button>
          </div>onClick={handleCreate}
        </form>
      </div>
      <div className='notes'>
      {todo.map((item, index) => {
        return <li key={index} className="itemStyle">
          <input  type="checkbox"/>
          {todoEditing === item.id ? (<input  type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText} />) : (<div className='itemText'> {item.name}</div>)}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          {todoEditing === item.id ? (<button onClick={() => editTodo(item.id)} className="submitEditBtn">Submit</button>) : (<button onClick={() => setTodoEditing(item.id)} className="editBtn" >Edit</button>)}
          </li>
      })}
      </div>
    </>
  );
}

export default App;

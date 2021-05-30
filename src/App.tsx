import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

export const TODO_KEY = 'TODOS';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem(TODO_KEY);
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const name = nameRef.current?.value ?? '';
    if (name === '') return;
    setTodos([...todos, name]);

    if (nameRef.current) {
      nameRef.current.value = '';
    }
  };

  const removeTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center space-y-8 pt-40'>
      <h1 className='text-4xl font-medium'>Todo list</h1>
      <div className='flex space-x-2'>
        <input
          data-testid='todo-input'
          type='text'
          ref={nameRef}
          className='border rounded py-2 px-4'
        />
        <button
          className='bg-indigo-500 py-2 px-4 rounded text-white hover:bg-indigo-700'
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      {todos?.map((value, index) => {
        return (
          <div key={index} className='flex justify-between w-80'>
            <p>{value}</p>
            <div className='text-gray400 cursor-pointer hover:text-gray-700'>
              <AiFillDelete
                data-testid={`delete-${value}`}
                onClick={() => {
                  removeTodo(index);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

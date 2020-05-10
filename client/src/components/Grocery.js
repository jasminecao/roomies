import React, { useEffect, useState } from 'react';
import './Grocery.css';
import ListItem from './ListItem';

const Grocery = () => {
  const [items, setItems] = useState([
    {
      name: 'test',
      isCompleted: false,
    }
  ]);

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      addItemAtIndex(e, i);
    }
  }

  function addItemAtIndex(e, i) {
    const newItems = [...items];
    newItems.splice(i + 1, 0, {
      name: '',
      isCompleted: false,
    });
    setItems(newItems);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function addItem() {
    const copyArray = items.slice();
    copyArray.push("");
    setItems(copyArray);
  }

  return (
    <div className="box left">
      <h2>Grocery List</h2>
      <form className="todo-list">
        <ul>
          {items.map((item, i) => (
            <div className="todo">
              <div className="checkbox" />
              <input className="itemInput" type="text" value={item.name} onKeyDown={e => handleKeyDown(e, i)} />
            </div>
          ))
          }
        </ul>
      </form>
      <button className="addButton" onClick={() => addItem()}>+ add new item</button>
    </div>
  )
}

export default Grocery;
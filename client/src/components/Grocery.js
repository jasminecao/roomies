import React, { useEffect, useState } from 'react';
import './Grocery.css';

const Grocery = () => {
  const [items, setItems] = useState([
    {
      name: 'milk',
      isCompleted: false,
    },
    {
      name: 'eggs',
      isCompleted: false,
    },
    {
      name: 'coffee',
      isCompleted: false,
    }
  ]);

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      addItemAtIndex(e, i);
    }

    if (e.key === 'Backspace' && items[i].name === '') {
      e.preventDefault();
      return removeItemAtIndex(i);
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

  function updateItemAtIndex(e, i) {
    const newItems = [...items];
    newItems[i].name = e.target.value;
    setItems(newItems);
  }

  function removeItemAtIndex(i) {
    if (i === 0 && items.length === 1) return;
    setItems(items => items.slice(0, i).concat(items.slice(i + 1, items.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleItemCompleteAtIndex(index) {
    const tempItems = [...items];
    tempItems[index].isCompleted = !tempItems[index].isCompleted;
    setItems(tempItems);
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
            <div className={`todo ${item.isCompleted && 'todo-is-completed'}`}>
              <div className="checkbox" onClick={() => toggleItemCompleteAtIndex(i)}>
                {item.isCompleted && (
                  <span style={{color: "white"}}>✔</span>
                )}
              </div>
              <input 
                className={`itemInput ${item.isCompleted && 'item-is-completed'}`}
                type="text" 
                value={item.name} 
                onKeyDown={e => handleKeyDown(e, i)} 
                onChange={e => updateItemAtIndex(e, i)}/>
            </div>
          ))
          }
        </ul>
      </form>
      <button className="addButton" onClick={e => addItemAtIndex(e, items.length - 1)}>+ add new item</button>
    </div>
  )
}

export default Grocery;
import React, { useEffect, useState } from 'react';

const MessageBoard = props => {
  const {username, name, groupName} = props

  const[messages, setMessages] = useState([
    {
      username: "Example",
      message: "",
    }
  ])

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      addItemAtIndex(e, i);
    }

    if (e.key === 'Backspace' && messages[i].message === '') {
      e.preventDefault();
      return removeItemAtIndex(e, i);
    }
  }

  function addItemAtIndex(e, i) {
    const newMessages = [...messages];
    newMessages.splice(i + 1, 0, {
      username: 'uhh', //FIX
      message: "",
    });
    setMessages(newMessages);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateItemAtIndex(e, i) {
    const newMessages = [...messages];
    newMessages[i].message = e.target.value;
    setMessages(newMessages);
  }

  function removeItemAtIndex(e, i) {
    if (i === 0 && messages.length === 1) return;
    console.log(messages);
    setMessages(messages => messages.slice(0, i).concat(messages.slice(i + 1, messages.length)));
  }

  return (
    <div className="boxLeft">
      <h2>Notifications</h2>
      <form className="message-list">
        <ul>
          {messages.map((item, i) => (
            <div key={i} className="message">
              <span className="bulb">
                💡
              </span>
              <div className="messageUserText">{name}</div>
              <textarea 
                className={"messageText"}
                type="text"
                key={i}
                value={item.message}
                onKeyDown={e => handleKeyDown(e, i)} 
                onChange={e => updateItemAtIndex(e, i)}
                placeholder="Write a message"
              />
            </div>
          ))
          }
        </ul>
      </form>
      <button className="addMessageButton" onClick={e => addItemAtIndex(e, messages.length - 1)}>+ add message🐸</button>
    </div>
  )
}

export default MessageBoard;
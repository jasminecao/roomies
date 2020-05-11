import React, { useEffect, useState } from 'react';

const MessageBoard = props => {
  const {username, name, groupName} = props

  const[messages, setMessages] = useState([])

  useEffect(() => {
    if (groupName !== undefined) {
      async function callBackendAPI() {
        const response = await fetch('/message');
        const body = await response.json();
        return body;
      }
      callBackendAPI().then(res => {if (res.length !== 0) setMessages(res)}).catch(err => console.log(err));
    }
  }, [groupName])

  useEffect(() => {
    sendPost();
  }, [messages])

  function sendPost() {
    console.log('sending post')
    if (groupName !== undefined) {
      var postInfo = {
        groupName: groupName,
        messageList: messages,
      }
  
      async function callBackendAPI() {
        const requestOptions = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postInfo),
        }
        const response = await fetch('/message', requestOptions);
        return response;
        }
      callBackendAPI().then(res => console.log("response from post: " + res)).catch(err => console.log(err));  
    }
  }

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
      username: name,
      message: "",
    });
    setMessages(newMessages);
  }

  function updateItemAtIndex(e, i) {
    const newMessages = [...messages];
    newMessages[i].message = e.target.value;
    setMessages(newMessages);
  }

  function removeItemAtIndex(e, i) {
    console.log(messages);
    setMessages(messages => messages.slice(0, i).concat(messages.slice(i + 1, messages.length)));
  }

  return (
    <div className="column left">
    <div className="boxLeft">
      <h2>Notifications</h2>
      <form className="message-list">
        <ul>
          {messages.map((item, i) => (
            <div key={i} className="message">
              <span className="bulb">
                💡
              </span>
              <div className="messageUserText">{item.username}</div>
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
    </div>
  )
}

export default MessageBoard;
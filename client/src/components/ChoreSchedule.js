import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const ChoreSchedule = props => {
  const {username, name, groupName} = props;

  const [addChore, setAddChore] = useState(false);
  const [choreName, setChoreName] = useState('');
  const [choreUser, setChoreUser] = useState('assign chore');
  const [choreDay, setChoreDay] = useState('day');
  const [choreList, setChoreList] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (groupName !== undefined) {
      async function callBackendAPI() {
        const response = await fetch('/chore');
        const body = await response.json();
        return body;
      }
      callBackendAPI().then(res => {
        setUsers(res.groupMembers);
        if (res.choreList !== undefined) setChoreList(res.choreList)
      })
        .catch(err => console.log(err));
    }
  }, [groupName]);

  useEffect(() => {
    sendPost();
  }, [choreList])

  function sendPost() {
    console.log('sending post')
    if (groupName !== undefined) {
      var postInfo = {
        groupName: groupName,
        choreList: choreList,
      }
  
      async function callBackendAPI() {
        const requestOptions = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postInfo),
        }
        const response = await fetch('/chore', requestOptions);
        console.log(response)
        return response;
        }
      callBackendAPI().then(res => console.log("response from post: " + res)).catch(err => console.log(err));  
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (choreDay !== 'day' && choreUser !== 'assign chore') {
      const newChoreList = [...choreList];
      newChoreList.splice(newChoreList.length + 1, 0, {
        choreName: choreName,
        choreUser: choreUser,
        choreDay: choreDay,
      });
      setChoreList(newChoreList);
      setChoreName('');
      setChoreUser('assign chore');
      setChoreDay('day');
    }
  }

  function convertDay(weekday) {
     switch(weekday) {
        case 'sunday':
          return 0;
        case 'monday':
          return 1;
        case 'tuesday':
          return 2;
        case 'wednesday':
          return 3;
        case 'thursday':
          return 4;
        case 'friday':
          return 5;
        case 'saturday':
          return 6;
        default: 
          break;
      }
  }

  function renderTable() {
    return choreList.map((entry, i) => {
      const table = document.querySelector("table");
      if (i === 0) {
        if (table.rows.length > 2) {
          const rowlength = table.rows.length
          for (let j = rowlength - 2; j >= 1; j --) {
            table.deleteRow(j);
          }
        }
      }
      const length = table.rows.length;
      for (let j = 1; j < length; j++) {
        let cell =  table.rows[j].cells[convertDay(entry.choreDay)]
        if (j === table.rows.length - 1) {
          let newRow = table.insertRow();
          for (let k = 0; k < 7; k++) {
            newRow.insertCell(k);
          }
        }
        if (cell.innerHTML === '') {
          let index = users.indexOf(entry.choreUser);
          
          let tag = `<div class="userText">` + entry.choreUser + `</div>` + `<br/>` +
                    `<div class="choreText">` + entry.choreName + `</div>`
          if (index === 0) {
            tag = `<div class="chorestyle0">` + tag + `</div>`
          } else if (index === 1) {
            tag = `<div class="chorestyle1">` + tag + `</div>`
          } else if (index === 2) {
            tag = `<div class="chorestyle2">` + tag + `</div>`
          } else if (index === 3) {
            tag = `<div class="chorestyle3">` + tag + `</div>`
          } else if (index === 4) {
            tag = `<div class="chorestyle4">` + tag + `</div>`
          } else {
            tag = `<div class="chorestyle">` + tag + `</div>`
          }

          cell.innerHTML = tag;
          return;
        }
      }
    })
  }

  return (
    <div className="boxRight">
      <h2>Chore Calendar</h2>

      <div className="calendar">
        <table>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tues</th>
            <th>Weds</th>
            <th>Thurs</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {renderTable()}
          </tbody>
        </table>
        <form className="choreForm">
          <button className="addChoreButton" type="button" onClick={() => setAddChore(!addChore)}>+ add chore🧹</button>
          <br></br>
          {addChore &&
            <div className="choreInput">
              <input type="text" name="choreName" placeholder="chore name" value={choreName} onChange={e => setChoreName(e.target.value)} required/>
              <select id="choreUser" value={choreUser} onChange={e => setChoreUser(e.target.value)} required>
                <option value="assign chore" disabled>assign chore</option>
                {users.map((entry, i) => (
                  <option key={i} value={entry}>{entry}</option>
                ))}
              </select>
              <select id="choreDay" value={choreDay} onChange={e => setChoreDay(e.target.value)} required>
                <option value="day" disabled>day</option>
                <option value="sunday">sunday</option>
                <option value="monday">monday</option>
                <option value="tuesday">tuesday</option>
                <option value="wednesday">wednesday</option>
                <option value="thursday">thursday</option>
                <option value="friday">friday</option>
                <option value="saturday">saturday</option>
              </select>
              <button type="button" className="submitChore" onClick={e => handleSubmit(e)}>add ✔</button>
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default ChoreSchedule;
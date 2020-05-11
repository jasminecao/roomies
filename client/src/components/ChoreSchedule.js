import React, {useEffect, useState} from 'react';
import _ from 'lodash';

const ChoreSchedule = () => {
  const [addChore, setAddChore] = useState(false);
  const [choreName, setChoreName] = useState('');
  const [choreUser, setChoreUser] = useState('assign chore');
  const [choreDay, setChoreDay] = useState('day');
  const [choreList, setChoreList] = useState([]);
  const [numRows, setNumRows] = useState(2);

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
            console.log("deleting" + j)
            table.deleteRow(j);
          }
        }
      }
      const length = table.rows.length;
      for (let j = 1; j < length; j++) {
        console.log("in for loop")
        let cell =  table.rows[j].cells[convertDay(entry.choreDay)]
        if (j === table.rows.length - 1) {
          let newRow = table.insertRow();
          for (let k = 0; k < 7; k++) {
            newRow.insertCell(k);
          }
          console.log("inserted new row")
        }
        if (cell.innerHTML === '') {
          cell.innerHTML = entry.choreName;
          console.log("about to break")
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
                <option value="user1">user1</option>
                <option value="user2">user2</option>
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
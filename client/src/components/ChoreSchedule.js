import React, {useEffect, useState} from 'react';

const ChoreSchedule = () => {
  const [addChore, setAddChore] = useState(false);
  const [choreName, setChoreName] = useState('');
  const [choreUser, setChoreUser] = useState('assign chore');
  const [choreDay, setChoreDay] = useState('day');
  const [choreList, setChoreList] = useState({sunday:[], monday:[], tuesday:[], wednesday:[], thursday:[], friday:[], saturday:[]});

  function handleSubmit(e) {
    e.preventDefault();
    if (choreDay !== 'day' && choreList !== 'assign chore') {
      switch(choreDay) {
        case 'sunday':
          addChoreToList(0);
          break;
        case 'monday':
          addChoreToList(1);
          break;
        case 'tuesday':
          addChoreToList(2);
          break;
        case 'wednesday':
          addChoreToList(3);
          break;
        case 'thursday':
          addChoreToList(4);
          break;
        case 'friday':
          addChoreToList(5);
          break;
        case 'saturday':
          addChoreToList(6);
          break;
        default: 
          break;
      }
      console.log(choreList);
      setChoreName('');
      setChoreUser('assign chore');
      setChoreDay('day');
    }
  }

  function addChoreToList(i) {
    console.log(choreList.onChange);
    const newChoreList = choreList.i.slice();
    newChoreList.i.push({
      choreName: choreName,
      choreUser: choreUser,
      choreDay: choreDay,
    })
    setChoreList(newChoreList);
    console.log(choreList)
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
          <tr>
            {/* {choreList.map((entry, i) => (
              <td><div>{entry.choreName}</div></td>
              ))
            } */}
          </tr>
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
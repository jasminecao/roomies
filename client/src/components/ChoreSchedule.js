import React, {useEffect, useState} from 'react';

const ChoreSchedule = () => {
  const [addChore, setAddChore] = useState(false);

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
            <td><div contentEditable>asdf</div></td>
          </tr>
        </table>
        <form className="choreForm">
          <button className="addChoreButton" type="button" onClick={() => setAddChore(!addChore)}>+ add chore🧹</button>
          <br></br>
          {addChore &&
            <div className="choreInput">
              <input type="text" name="choreName" placeholder="chore name" required/>
              <select id="choreUser" required>
                <option selected disabled>assign chore</option>
                <option value="user1">user1</option>
                <option value="user2">user2</option>
              </select>
              <select id="choreDay" required>
                <option selected disabled>day</option>
                <option value="sunday">sunday</option>
                <option value="monday">monday</option>
                <option value="tuesday">tuesday</option>
                <option value="wednesday">wednesday</option>
                <option value="thursday">thursday</option>
                <option value="friday">friday</option>
                <option value="saturday">saturday</option>
              </select>
              <button className="submitChore">add ✔</button>
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default ChoreSchedule;
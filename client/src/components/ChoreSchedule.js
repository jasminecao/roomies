import React from 'react';

const ChoreSchedule = () => {
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
            <td>asdfasdfasdfasdfasdf</td>
          </tr>
        </table>
        <form className="choreForm">
          <button>add chore</button>
          <input type="text" />
        </form>
      </div>
    </div>
  )
}

export default ChoreSchedule;
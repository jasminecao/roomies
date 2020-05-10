import React from 'react';

const ListItem = props => {
  console.log(props)
  return (
    <li>
      {props.item}
    </li>
  )
}

export default ListItem
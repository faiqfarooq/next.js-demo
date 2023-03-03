import React from 'react'

function MeetupDetails(props) {
  return (
    <React.Fragment>
    <img
      src={props.image}
      alt={props.title}
    />
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
  </React.Fragment>
  )
}

export default MeetupDetails
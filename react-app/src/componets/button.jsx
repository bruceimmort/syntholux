import * as React from 'react';

export default function Button(props) {
  return (
    <button className='buttonComponent' style={{backgroundColor: props.backgroundColor, color: props.color,}}> {props.text}</button>
  );
}
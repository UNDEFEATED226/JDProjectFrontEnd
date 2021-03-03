import React from 'react';
 
const ToDo = ({todo,handleToggle}) => {
    return (
        <li style={{listStyle:"none"}}>
        <input type="checkbox" checked={todo.selected} onClick={()=>{handleToggle(todo.id)}}/>  {todo.description}
        </li>
    );
 };
 
export default ToDo;
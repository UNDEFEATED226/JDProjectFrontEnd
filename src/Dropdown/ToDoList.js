import React from 'react';
import ToDo from './ToDo';
 
const ToDoList = ({toDoList, handleToggle}) => {
   return (
       <ul style={{border:"2px solid grey",width:"49%",display:"inline-block",marginRight:"1%"}} className="text-secondary">
           <h6 className="font-weight-bold text-secondary">资源ID:{toDoList[0].resid}, 资源名称:{toDoList[0].resname}</h6>
           {toDoList.map(todo => {
               return (
                   <ToDo todo={todo} handleToggle={handleToggle}/>
               )
           })}
        </ul>
   );
};
 
export default ToDoList;
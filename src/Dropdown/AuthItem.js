import React from 'react';
 
const AuthItem = ({auth,handleToggle}) => {
    return (
        <li key={auth.id} style={{listStyle:"none"}}>
        <input key={auth.id} type="checkbox" checked={auth.selected} onChange={()=>{handleToggle(auth.id)}}/>{auth.description}
        </li>
    );
 };
 
export default AuthItem;
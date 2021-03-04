import React from 'react';
import AuthItem from './AuthItem';
 
const AuthList = ({AuthList, handleToggle}) => {
   return (
       <ul style={{border:"2px solid grey",width:"49%",display:"inline-block",marginRight:"1%"}} className="text-secondary">
           <h6 className="font-weight-bold text-secondary">资源ID:{AuthList[0].resid}, 资源名称:{AuthList[0].resname}</h6>
           {AuthList.map(auth => {
               return (
                   <AuthItem key={auth.id} auth={auth} handleToggle={handleToggle}/>
               )
           })}
        </ul>
   );
};
 
export default AuthList;
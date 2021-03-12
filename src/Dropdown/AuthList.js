import React from 'react';
import AuthItem from './AuthItem';
 
const AuthList = ({AuthList, handleToggle}) => {
   return (
       <ul style={{border:"2px solid grey",width:"49%",display:"inline-block",marginRight:"1%",color:"#666669"}}>
           <h6 className="font-weight-bold text-secondary">{AuthList[0].resname}({AuthList[0].resid})</h6>
           {AuthList.map(auth => {
               return (
                   <AuthItem key={auth.id} auth={auth} handleToggle={handleToggle}/>
               )
           })}
        </ul>
   );
};
 
export default AuthList;
import React from 'react';
import axios from 'axios';
const demoData=()=>{
  axios.get('/api/hello')
    .then((res)=>{
      console.log(res);
      return res.data
    })
}
const App = () => (
  
    <div>
    <div style={{ width: '100%' }}>
    Internship Portal
   </div>
    <div>
      {demoData()}
    </div> 
    </div>
  
);

export default App;

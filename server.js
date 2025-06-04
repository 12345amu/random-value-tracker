const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public'))); 

let currentValue = 0;                         
let previousValue = 0;                        

setInterval(() => {                           
  previousValue = currentValue;               
  currentValue = Math.floor(Math.random() * 201) - 100;  
  const timestamp = new Date();              
  console.log(`[${timestamp.toISOString()}] Value: ${currentValue}`); 
}, 1000);

app.get('/api/current-value', (req, res) => {           
  res.json({                                            
    value: currentValue,                                
    trend: currentValue > previousValue ? 'up' :        
           currentValue < previousValue ? 'down' : 'same' 
  });                                                   
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); 
});
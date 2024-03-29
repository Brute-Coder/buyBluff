const mongoConnect = require('./db')
const express = require('express')
const app = express()
const port = 4000

mongoConnect()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.use(express.json())
app.use('/api',require("./routes/Createuser"))
app.use('/api',require("./routes/LoginUser"))
app.use('/api',require("./routes/DisplayData"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
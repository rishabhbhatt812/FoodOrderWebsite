const express = require("express");
const mongoDB = require('./db');



const app = express();
mongoDB();

app.use((res, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  resp.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

})
app.get('/', (resp, req) => {

})
app.use(express.json());
app.use('/api', require("./Routes/SignUp"));
app.use('/api', require("./Routes/Login"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData") );
app.use('/api', require("./Routes/MyOrder"));
app.listen(5000, () => {
  console.log("Server is running on port 5000");
})
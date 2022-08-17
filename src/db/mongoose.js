const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://admin:Password@cluster0.rknzc.mongodb.net/?retryWrites=true&w=majority' ,
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
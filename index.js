const express = require("express");
const cors = require("cors");
const app = express();
let {Messages} =require('./models/user.model')
app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');

const usersRoutes =require('./Routes/userRoutes')
const mongoose=require('mongoose')
const uri = "mongodb+srv://shahbaz:jasim123@cluster0.c1ikhi4.mongodb.net/test2?retryWrites=true&w=majority";

app.get("/hello", (req, res) => {
  res.send("hello world!!!");
    
});

app.use("/api/users", usersRoutes);
app.post("/api/message",async (req, res) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'muhammadsr972@gmail.com',
      pass:'ufsbfhclwkqjxjoe',
      }
    });
    // pass: 'xfvghykadtrsvtlc'
// await new Promise((resolve, reject) => {
//   // verify connection configuration
//   transporter.verify(function (error, success) {
//       if (error) {
//           console.log(error);
//           reject(error);
//       } else {
//           console.log("Server is ready to take our messages");
//           resolve(success);
//       }
//   });
// });
let message = {
  from: 'lighthunter222@gmail.com',
  to: 'muhammadsr972@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email.'
};
// await new Promise((resolve, reject) => {
//   // send mail
//   transporter.sendMail(mailData, (err, info) => {
//       if (err) {
//           console.error(err);
//           reject(err);
//       } else {
//           console.log(info);
//           resolve(info);
//       }
//   });
// });
try {
  transporter.sendMail(message, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Email sent: ' + info.response);
    }
});

} catch (error) {
  console.log('error occurred while sending mail')
}

  try {
  await Messages.create({
        name:req.body.Name,
        email:req.body.Email,
        phoneNumber:req.body.Phonenumber,
        message:req.body.message    

    })
    // res.send('ok')

    
} catch (error) {
    console.log('error',error,)
    
}
   
  res.json({status:'ok'});
});

app.listen(1337, () => {
  console.log("connected server");
});


  mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

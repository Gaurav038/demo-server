const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer")
const dataRoute = require("./routes/data")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
}))
const PORT = process.env.PORT || 8000


const connection = mongoose.connect(
    process.env.MONGO_DB_ADD,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  }
);

app.post("/api/send_mail", cors(), async (req, res) => {
	let text = req.body.selectedRows
	const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: 'youthtime038@gmail.com',
        pass: 'sxzvbjshcmiqzoaw'
		}
	})

	await transport.sendMail({
		from: "youthtime038@gmail.com",
		to: "gauravkarki038@gmail.com",
    // to: "info@redpositive.in",
		subject: "Full-stack internship coding task",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>Total selected Data - ${text.length}</p>
        <p>${text}</p>
    
        <p>send By - Gaurav Singh</p>
         </div>
    `
	})
})

app.use('/api', dataRoute)



const wbm = require("./wbm");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const sql = require("mssql");//25/12/2021

/*-------------------add detailes of sqlConfig-----------------*/

const config ={
  user: 'sa',
  password: '',
  server: 'localhost',
  database: ''
};

app.get('/', function(req, res){
  let connection = sql.connect(sqlConfig,err => {
   if(err){
     console.log(err);
   }
   else{
    res.send('DB Connected');
    //code for sql request here
   }
  });
  const request = new sql.Request();
  app.listen(port,function(){
    console.log('Server started at ${PORT}');
  });
  
  // SQL Query here
  request.query('select * from Tb...').then(res=>{
    console.log(res);
  })

})


/*-------------------------------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/api", (req, res) => {
  const { phone, msg } = req.body;

  wbm
    .start({ qrCodeData: true, session: false, showBrowser: false })
    .then(async (qrCodeData) => {
      console.log(qrCodeData); // show data used to generate QR Code
      res.send(qrCodeData);
      await wbm.waitQRCode();
///هنا اضيف الاستدعاء من الداتابيز 
      const phones = [phone];
      const message = msg;

      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Loading frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

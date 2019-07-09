const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const router = express.Router();
const dbURL = 
process.env.MONGODB_URI;


const Plant = require('./models/plant.js');
const Employee = require('./models/employee.js');


mongoose.connect(dbURL);
// app.use(bodyParser.json());

router.route('/plants')
  .get((req,res) => {
    Plant.find({}, (err,docs) =>{
      if(err){
        res
          .status(400)
          .send({
            error:err
          });
        return;
      }
      res
        .status(200)
        .send(docs);
    });
  });

router.route('/employees')
  .get((req, res)=>{
    Employee.find({}, (err, docs) =>{
      if (err){
        res
          .status(400)
          .send({
            error:err
          });
        return;
      }
      res
        .status(200)
        .send(docs);
    });
  });
app.use(express.static('public'));

app.listen(port);

app.use('/api/v1/', router);
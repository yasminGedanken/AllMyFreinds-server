const express = require('express');
const mongoose = require('mongoose') ;
const cors = require('cors');
const app = express();
const https = require("https");
const Axios = require("axios");
const UsersModel = require('./models/Users');
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://yasminGedanken:yasming134@humanz.8ebrm.mongodb.net/humanz?retryWrites=true&w=majority', {
    useNewUrlParser : true,
})



//read all users
app.get('/read', async (req, res) => {
  try {
    UsersModel.find({}, (err,result)=>{
      if(err){
        res.send(err)
      }
      res.send(result)
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error1');
  }
});


// //found city, region, country
// const findCounrty=(ip)=>{
//   console.log("enter func ", ip)
//    fetch(`http://ip-api.com/json/${ip}`)
//    .then(async response => {
//     console.log("mm",response);
//     const data = await response.json();});
// return data;
// }

//found city, region, country
 async function findCounrty(ip){
   try{
let response = await Axios.get(`http://ip-api.com/json/109.64.182.218`)
let data = await response.data;
const city  = data.city
const country  = data.country
const region  = data.region
return({city,country,region})
   }

  catch{
    (err => console.log("err is ",err));
  }
}

//add user
app.post('/insert', async (req, res) => {
 
    try {
      console.log("insert user ")

        const { name, id, ipAdress, phone } = req.body;
        const { city, region, country } = await findCounrty(ipAdress);
      
        user = ({
            name:  name,
             id: id,
             ipAdress: ipAdress,
              phone:phone,
              city: city,
              region: region, 
              country:country
            });

          const humanz = new UsersModel(user);
          const check = humanz.save();
          res.json(check);
    } catch (err) {
      console.error("error = ",err.message);
      res.status(500).send('Server Error2');
    }
  });


  //delete user
  app.delete('/delete/:id', async (req, res) => {
    try {
      const user =req.params.id;
       await UsersModel.findByIdAndRemove(user);
  
      if (!user) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      

      res.json({ msg: 'user removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
   


app.listen(3001, ()=>{
    console.log('runing');
});
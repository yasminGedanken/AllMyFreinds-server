const express = require('express');
const mongoose = require('mongoose') ;
const cors = require('cors');
const app = express();

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

//add user
app.post('/insert', async (req, res) => {
 
    try {
        const { name, id, ipAdress, phone } = req.body;
        console.log("name ", name);
        console.log("ip ", ipAdress);

        user = ({
          name:  name,
           id: id,
           ipAdress: ipAdress,
            phone:phone
          });
          const humanz = new UsersModel(user);
          const check = humanz.save();
          res.json(check);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error2');
    }
  });


  //delete user
  app.delete('/delete/:id', async (req, res) => {
    try {
      const user = await UsersModel.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      await user.remove();

      res.json({ msg: 'user removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
   


app.listen(3001, ()=>{
    console.log('runing');
});
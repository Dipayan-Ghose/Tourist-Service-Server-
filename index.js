const express = require("express");
const app= express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port= process.env.PORT || 5000;
var cors= require('cors');
const { response } = require("express");

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Tourist service api is running');
});


const uri = `mongodb+srv://${process.env.dbuser}:${process.env.password}@database.sgb0d3l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const serviceCollection = client.db("tourist-service").collection("service");
      app.get('/services', async(req, res) =>{
        const query = {  };
        const cursor = serviceCollection.find(query);
        const services= await cursor.toArray();
        res.send(services);

     });
     
     app.get('/slider', async(req, res) =>{
      const query = {  };
      const cursor = serviceCollection.find(query).limit(8);
      const services= await cursor.toArray();
      res.send(services); 
     });

     app.get('/threeServices', async(req, res) =>{
      const query = {  };
      const cursor = serviceCollection.find(query).limit(3);
      const services= await cursor.toArray();
      res.send(services); 
     });

     app.get('/services/:id',async (req, res) =>{
      // res.send(courseDetails);
      const id= req.params.id;
      const query = { _id: ObjectId(id) };
        const service =await serviceCollection.findOne(query);
        res.send(service);
      });
  

    } 
    

   
   
   
    finally {
      
    }
  }
  run().catch(err=> console.log(err));





app.listen(port, ()=>{
    console.log("Tourist server api is running");
});
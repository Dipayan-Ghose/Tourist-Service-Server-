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
      const reviewCollection= client.db("tourist-service").collection("reviews")
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
      const options = {
        sort: { _id: -1},
      };
      const cursor = serviceCollection.find(query,options).limit(3);
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

      // Add Service api

      app.post('/service', async(req,res)=>{
        const review=req.body;
        const result= await serviceCollection.insertOne(review);
        res.send(result);
      });

      // comment api

      app.post('/reviews', async(req,res)=>{
        const review=req.body;
        const result= await reviewCollection.insertOne(review);
        res.send(result);
      });

      app.get('/reviews', async(req, res) =>{
          // const id= req.params.id;
          const query = {  };
        const cursor = reviewCollection.find(query);
        const services= await cursor.toArray();
        res.send(services);
     });

     app.get('/reviews/:id', async(req, res) =>{
      const id= req.params.id;
      const query = { _id: ObjectId(id)  };
    const cursor = reviewCollection.find(query);
    const services= await cursor.toArray();
    res.send(services);
 });

 app.get('/review', async(req, res) =>{
  const serviceId= req.query.serviceId;
  console.log(serviceId);
  const query = { serviceId };
  
  // if(req.query.email){
  //   query={
  //     email: req.query.email
  //   }
  // }
  const cursor = reviewCollection.find(query);
  const services= await cursor.toArray();
  res.send(services);
  });

     app.get('/revieww', async(req, res) =>{
      const email= req.query.email;
      console.log(email);
      let query = { email };
      
      // if(req.query.email){
      //   query={
      //     email: req.query.email
      //   }
      // }
      const cursor = reviewCollection.find(query);
      const services= await cursor.toArray();
      res.send(services);
      });

      app.patch('/reviews/:id',  async (req, res) => {
        const id = req.params.id;
        const filter ={_id: ObjectId(id)};
        const user = req.body;
        const updatedUser = {
            $set: {
                comment: user.comment
            }
        }
        const result = await reviewCollection.updateOne(filter, updatedUser);
        res.send(result);
    })

      app.delete('/reviews/:id', async(req,res)=>{
        const id= req.params.id;
        const query={ _id: ObjectId(id) };
        const result= await reviewCollection.deleteOne(query);
        res.send(result);
      });
  

    } 
    

   
   
   
    finally {
      
    }
  }
  run().catch(err=> console.log(err));





app.listen(port, ()=>{
    console.log("Tourist server api is running");
});
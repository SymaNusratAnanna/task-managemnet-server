const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dayyzkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

//  async function run(){
//     try {
//         await client.connect();
//         console.log('database connected');

//     }
//     finally{

//     }

// }
// run().catch(console.dir);

async function run(){
  try{
    await client.connect();
  const taskCollection = client.db('endgame-task').collection('tasks');
  app.get('/task', async (req, res) => {
    const query ={};
  const cursor = taskCollection.find(query);
  const tasks = await  cursor.toArray();
  res.send(tasks);

  })
  


    // POST
    app.post('/task',async(req, res)=>{
      const newTask = req.body;
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    })
  }
  finally{

  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
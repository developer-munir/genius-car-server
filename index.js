const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
// midleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.asxi1ae.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try {
        const servicesCollection = client.db('geniuscar').collection('services');
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {
        
    }
}
run().catch(error => console.error(error))


app.get("/", (req, res) => {
  res.send("Genius server is running");
});
app.listen(port, (req, res) => {
  console.log("Server Running");
});

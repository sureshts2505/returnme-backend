const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://sureshts2505_db_user:suresh2505@ac-rcfff03-shard-00-00.njuyyn0.mongodb.net:27017,ac-rcfff03-shard-00-01.njuyyn0.mongodb.net:27017,ac-rcfff03-shard-00-02.njuyyn0.mongodb.net:27017/returnme?ssl=true&replicaSet=atlas-g5729y-shard-0&authSource=admin&appName=Cluster0";

MongoClient.connect(url)
.then((conn) => {
    const dbo = conn.db("returnme");
    console.log("Database connected");

    dbo.createCollection("losts")
    dbo.createCollection("founds")
    dbo.createCollection("users")
    dbo.createCollection("reviews")
    .then(() => {
        console.log("Collection created");
    })
    .catch(err => console.log(err));
})
.catch((err) => console.log(err));
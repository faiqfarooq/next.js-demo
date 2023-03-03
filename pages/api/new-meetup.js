import { MongoClient } from "mongodb";

async function meetuphandler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;      
    const client= await MongoClient.connect('mongodb+srv://hamadfarooq2229:CZ2T6Lx7IMVeZDrQ@cluster0.viywvrn.mongodb.net/meetup?retryWrites=true&w=majority');
    const clientDB=client.db();
    const databaseCollection = clientDB.collection('meetup');
   const reault= await databaseCollection.insertOne(data);
   console.log(reault);
   client.close();
   res.status(201).json({message:'Data is sent to the database'})

  }
  console.log('new-meetup index mongo')
}

export default meetuphandler;

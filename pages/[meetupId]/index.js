import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head"; 
import React from "react";

function index(props) {

  return (
    <>
    <Head>
      <title>{props.meetup.title}</title>
      <meta name="description" content="Its all about the meetup plans which will help to start new journey." />
    </Head>
    <MeetupDetails
      image={props.meetup.image}
      title={props.meetup.title}
      address={props.meetup.address}
      description={props.meetup.description}
    />
    </>
    
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hamadfarooq2229:CZ2T6Lx7IMVeZDrQ@cluster0.viywvrn.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const clientDB = client.db();
  const databaseCollection = clientDB.collection("meetup");
  const DBmeetup = await databaseCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: DBmeetup.map((data) => ({
      params: { meetupId: data._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://hamadfarooq2229:CZ2T6Lx7IMVeZDrQ@cluster0.viywvrn.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  const clientDB = client.db();
  const databaseCollection = clientDB.collection("meetup");
  const DBmeetup = await databaseCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetup: {
        id: DBmeetup._id.toString(),
        image: DBmeetup.image,
        title: DBmeetup.title,
        description: DBmeetup.description,
        address: DBmeetup.address,
      },
    },
  };
}
export default index;

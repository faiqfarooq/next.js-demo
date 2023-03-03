import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
const dummy=[
  {id:'m1', 
  title: 'First meetup' ,
  image: 'https://i.tribune.com.pk/media/images/1741554-avenfieldapartment-1529855398/1741554-avenfieldapartment-1529855398.jpg', 
  address:'ada plot#103,main g the chor cholony,lahore', 
  description:'It will bhe the first and amazing '  },
  {id:'m2', 
  title: 'second meetup' ,
  image: 'https://i0.wp.com/factfocus.com/wp-content/uploads/2020/08/Eusha-home-June-2018.jpg?resize=700%2C480&ssl=1', 
  address:'ada plot#103,haji colony,pakistan', 
  description:'It will bhe the first and amazing '  },
]

function index(props) {
 
  return (
    <>
    <Head>
      <title>Meetups</title>
      <meta name="description" content="Its all about the meetup plans which will help to start new journey." />
    </Head>
    <MeetupList meetups={props.meetup}/>
    </>
  )
}

// export async function getServerSideProps(context){
//   const req=context.req;
//   const res=context.res;
//   return {
//     props:{
//       meetup:dummy,
//     }
//   }
// }

export async function getStaticProps(){

  const client= await MongoClient.connect('mongodb+srv://hamadfarooq2229:CZ2T6Lx7IMVeZDrQ@cluster0.viywvrn.mongodb.net/meetup?retryWrites=true&w=majority');
  const clientDB=client.db();
  const databaseCollection = clientDB.collection('meetup');
 const DBmeetup= await databaseCollection.find().toArray();
 client.close();

  return{
    props:{
      meetup:DBmeetup.map((meetup)=>({
        id:meetup._id.toString(),
        title:meetup.title,
        address:meetup.address,
        description:meetup.description,
        image:meetup.image,

      })),
        },
        revalidate: 1,
  }
}

export default index;
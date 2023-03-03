import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import Head from "next/head";
import { useRouter } from "next/router";

function index() {
  const router=useRouter();
 async function addMeetUphandler(data){
  console.log(data)
  const response= await fetch('/api/new-meetup',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
  })
  const result= await response.json();
    console.log(result);
    router.push('/');
    console.log(data)
    console.log('new-meetup index fetch')
  }


  return (
    <>
    <Head>
      <title>Add new Meetup plan</title>
      <meta name="description" content="Its all about the meetup plans which will help to start new journey." />
    </Head>
    < NewMeetupForm onAddMeetup={addMeetUphandler} />
    </>
  )
}

export default index
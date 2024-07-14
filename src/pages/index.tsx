import Navbar from "@/components/Navbar";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const session = useSession()

  return (
    <main>
      <Navbar />
      {/* {!session.data && <div>
        <h1>Not Logged in</h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>}
      {session.data && <div>
        <h1>Logged In {session.data?.user.name}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>} */}
    </main>
  );
}
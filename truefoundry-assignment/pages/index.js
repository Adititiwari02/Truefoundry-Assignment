import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

import Card from "react-bootstrap/Card";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {!session && (
        <button onClick={() => signIn()}>Sign in with Github</button>
      )}
      {session && (
        <div>
          {console.log(session)}
          <button onClick={() => signOut()}>
            Sign out ({session.user.name})
          </button>
          <h1>{session.user.username}</h1>
          <br></br>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={session.user.image} />
            <Card.Body>
              <Card.Title>{session.user.email}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

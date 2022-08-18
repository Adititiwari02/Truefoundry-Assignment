import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [ifAddRepo, setIfAddRepo] = useState(false);
  const [repoData, setRepoData] = useState();

  function getUserIdFromImageURL(imageUrl) {
    var id = "";
    var numberOfSlash = 0;
    for (var ch in imageUrl) {
      if (imageUrl.charAt(ch) === "?") break;
      else if (numberOfSlash == 4) id += imageUrl.charAt(ch);
      else if (imageUrl.charAt(ch) === "/") numberOfSlash += 1;
    }
    return id;
  }
  // Find the number of repositories for a user
  async function repoDataURL() {
    var userId = getUserIdFromImageURL(session.user.image);
    await fetch(`https://api.github.com/user/${userId}/repos`)
      .then((res) => res.json())
      .then(
        (result) => {
          const list = result.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="text-center">
              {console.log(item.name)}
              <a target="_blank" href={item.svn_url} rel="noreferrer">
                {item.name}
              </a>
            </div>
          ));
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Take the input for repo name and description
  function useInput({ type, placeholder }) {
    const [value, setValue] = useState("");
    const input = (
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
    );
    return [value, input];
  }
  const [repoName, repoNameInput] = useInput({
    type: "text",
    placeholder: "Enter Repo Name",
  });
  const [repoDescription, repoDescriptionInput] = useInput({
    type: "text",
    placeholder: "Enter Repo Description",
  });

  // Add the repo on clicking save
  async function addRepo() {
    const url = "https://api.github.com/user/repos";
    const token = session.accessToken;
    const headers = {
      Authorization: `Token ${token}`,
    };
    const payLoad = {
      name: repoName,
      description: repoDescription,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payLoad),
    });
    const result = await response.json();
    console.log(result);
    setIfAddRepo(!ifAddRepo);
  }

  return (
    <div className={styles.container}>
      {!session && (
        <button className={styles.button} onClick={() => signIn()}>
          Sign in with Github
        </button>
      )}

      {session && (
        <>
          {console.log(JSON.stringify(session))};
          <button className={styles.button} onClick={() => signOut()}>
            Sign out ({session.user.name})
          </button>
          <img className={styles.img} variant="top" src={session.user.image} />
          <h1 className={styles.title}>{session.user.email}</h1>
          <button className={styles.button} onClick={repoDataURL}>
            See all Repos
          </button>
          <h3 className={styles.title}>{repoData}</h3>
          {!ifAddRepo && (
            <button
              className={styles.button}
              onClick={() => setIfAddRepo(!ifAddRepo)}
            >
              Add new Repo
            </button>
          )}
          {ifAddRepo && (
            <>
              {repoNameInput}
              {repoDescriptionInput}
              <button className={styles.button} onClick={() => addRepo()}>
                Save Changes
              </button>
              <button
                className={styles.button}
                onClick={() => setIfAddRepo(!ifAddRepo)}
              >
                Cancel
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

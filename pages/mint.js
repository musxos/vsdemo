import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { samuraiaddress } from "@/config";
import useConnection from "@/hooks/useConnection";
import useContract from "@/hooks/useContract";
import samuraiContractABI from "@/assets/samurai.json";
import styles from "@/styles/Mint.module.css";

function mint() {
  const router = useRouter();
  const connection = useConnection();
  const samuraiContract = useContract(samuraiaddress, samuraiContractABI);

  const [mintTo, setMintTo] = useState("");
  const [mintURI, setMintURI] = useState("");

  const mintNFT = async (to, uri) => {
    try {
      await samuraiContract.safeMint(to, uri);
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };

  useEffect(() => {
    connection.connect();
  }, [connection.address]);

  return (
    <div className={styles.mintSection}>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        ></link>
      </Head>
      <div>
        <input
          placeholder="to"
          value={mintTo}
          onChange={(e) => setMintTo(e.target.value)}
          className={styles.mintInput}
        />
        <input
          placeholder="uri"
          onChange={(e) => setMintURI(e.target.value)}
          className={styles.mintInput}
        />
        <button
          onClick={() => mintNFT(mintTo, mintURI)}
          className={styles.mintButton}
        >
          MINT
        </button>
      </div>
      <button onClick={() => router.push("/")} className={styles.mintButton}>
        Go to Home Page
      </button>
    </div>
  );
}

export default mint;

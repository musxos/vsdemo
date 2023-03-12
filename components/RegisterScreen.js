import React, { useEffect, useState } from "react";
import useConnection from "@/hooks/useConnection";
import { gameaddress } from "@/config";
import  { gamejson } from "./Game.json";
import useContract from "@/hooks/useContract";
import gameContractABI from "@/assets/game.json";

const Moralis = require("moralis").default;

const RegisterScreen = () => {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;

  const connection = useConnection();

  const [nickName, setNickName] = useState("");
  const [description, setDescription] = useState("");

  const gameContract = useContract(gameaddress, gameContractABI);

  const register = async () => {
    const uploadArray = [
      {
        path: `${nickName}.json`,
        content: {
          nickName: nickName,
          description: description,
        },
      },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });

    let uri = response.result[0].path;

    const txn = await gameContract.register(uri);
    await txn.wait();
  };

  const moralisStart = async () => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: apiKey });
    }
  };

  useEffect(() => {
    connection.connect();
    if (connection.address) {
      moralisStart();
    }
  }, [connection.address]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 col-md-6 col-xs-12 col-lg-6 col-xl-4 mx-auto bg-dark rounded">
          <h5 className="text-center mt-2 mb-2 text-light">
            {" "}
            Start Your Legend
          </h5>

          <div className="input-group mt-2 mb-2">
            <a className="text-decoration-none text-light mx-2 my-auto">
              UserName :
            </a>
            <input
              onChange={(e) => setNickName(e.target.value)}
              className="form-control rounded"
              type="text"
              placeholder=""
            />
          </div>
          <div className="input-group mt-2 mb-2">
            <a className="text-decoration-none text-light mx-2 my-auto">
              Description :
            </a>
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="form-control rounded"
              type="text"
              placeholder=""
            />
          </div>
          <div className="input-group mt-2 mb-2">
            <a onClick={register} className="mx-auto btn btn-outline-warning">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>

    // {/* <div className={styles.container} >
    //     <input onChange={(e) => setNickName(e.target.value)} placeholder="nick name" />
    //     <input onChange={(e) => setDescription(e.target.value)} placeholder="description" />
    //     <button onClick={register} className={styles.routerButton} >Register</button>
    // </div> */}
  );
};

export default RegisterScreen;

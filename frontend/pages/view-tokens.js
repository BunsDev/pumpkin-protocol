import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdCreate } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { BiPieChartAlt2 } from "react-icons/bi";
import { BiTrophy } from "react-icons/bi";
import Head from "next/head";
import Modal from "../components/Modal";
import TokenCountModal from "../components/TokenCountModal";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { PumpkinAddress } from "../constants/PumpkinAddress";

const ViewTokens = () => {
  const { runContractFunction } = useWeb3Contract();
  const {
    enableWeb3,
    authenticate,
    chainId,
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();
  const [modal, setModal] = useState(false);
  const [tokenCountModal, setTokenCountModal] = useState(false);
  const [tokens, setTokens] = useState([]);

  const getUserIndexTokens = async function () {
    await enableWeb3();
    // console.log(account);
    if (account) {
      runContractFunction({
        params: {
          abi: PUMPKIN_ABI,
          contractAddress: PumpkinAddress,
          functionName: "getAllTokenAddresses",
          params: {
            _creator: account,
          },
        },
        //
        onError: error => console.log(error),
        onSuccess: data => {
          console.log(data);
        },
      });
    }
  };

  useEffect(() => {
    getUserIndexTokens();
  }, [account]);

  return (
    <>
      <Head>
        <title>View Tokens</title>
      </Head>
      <Modal setModal={setModal} modal={modal}></Modal>
      <TokenCountModal
        setTokenCountModal={setTokenCountModal}
        tokenCountModal={tokenCountModal}
      ></TokenCountModal>
      {/* {tokens.join("\n")} */}

      <div className="bg-container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      {/* TODO create a update token quantity modal */}
      <div className="view-token--container">
        {/* {account} */}
        {!modal && (
          <div className="new__content">
            <img src={"/images/ftm-logo.png"} alt="" className="new__img" />
            <h3 className="new__title">My Index Token</h3>
            {/* <span className="new__subtitle">Accessory</span> */}

            <div className="new__prices">
              <span className="new__subtitle">
                Approx value in USD ~ $14.99
              </span>
            </div>
            <br />
            <div className="view-token--buttons">
              <Button variant="light" color="indigo">
                <span
                  className="edit-btn--container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <GiTakeMyMoney></GiTakeMyMoney>
                  </span>
                  Redeem Tokens
                </span>
              </Button>

              <Button
                color="green"
                onClick={e => {
                  setTokenCountModal(true);
                }}
              >
                <span
                  className="edit-btn--container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                    }}
                  >
                    <IoIosCreate></IoIosCreate>
                  </span>
                  Issue Tokens
                </span>
              </Button>

              <Button
                color="indigo"
                onClick={e => {
                  setModal(true);
                }}
              >
                <span
                  className="edit-btn--container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      width: "90%",
                    }}
                  >
                    <BiPieChartAlt2></BiPieChartAlt2>
                  </span>
                  Rebalance Tokens
                </span>
              </Button>

              <Button
                color="indigo"
                onClick={e => {
                  setModal(true);
                }}
              >
                <br />
                <br />
                <span
                  className="edit-btn--container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      width: "90%",
                    }}
                  >
                    <BiTrophy></BiTrophy>
                  </span>
                  Claim Fee
                </span>
              </Button>
            </div>
            {account}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTokens;

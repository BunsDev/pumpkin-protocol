import React, { useState } from "react";
import { Button } from "@mantine/core";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdCreate } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import Modal from "../components/Modal";
import TokenCountModal from "../components/TokenCountModal";

const ViewTokens = () => {
  const [modal, setModal] = useState(false);
  const [tokenCountModal, setTokenCountModal] = useState(false);
  return (
    <>
      <Modal setModal={setModal} modal={modal}></Modal>
      <TokenCountModal
        setTokenCountModal={setTokenCountModal}
        tokenCountModal={tokenCountModal}
      ></TokenCountModal>

      <div className="bg-container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      {/* TODO create a update token quantity modal */}
      <div className="view-token--container">
        {!modal && (
          <div className="new__content">
            <img src={"/images/ftm-logo.png"} alt="" className="new__img" />
            <h3 className="new__title">Token Name</h3>
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
                  Withdraw Underlying Tokens
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
                    }}
                  >
                    <MdCreate></MdCreate>
                  </span>
                  Update Token Ratios
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
                  Update Token Quantity
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTokens;

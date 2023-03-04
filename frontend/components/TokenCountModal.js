import React, { useState } from "react";
import { Button } from "@mantine/core";
import { MdCreate } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";

const TokenCountModal = ({ tokenCountModal, setTokenCountModal }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenQuantity, setTokenQuantity] = useState(1);
  return (
    <>
      {tokenCountModal && (
        <div className="modal-container">
          <div className="index-token--container">
            {/* ------------------Get Token Address ------------------*/}
            <fieldset>
              <legend>Token Info</legend>
              <div className="index-token">
                <div className="token-label--container">
                  <label className="token-name--label">Token Address - </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="text"
                    className="token-count--address"
                    id="token-name"
                    placeholder="0x..."
                    onChange={e => {
                      setTokenAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="index-token">
                <div className="token-label--container">
                  <label className="token-name--label">Token Count - </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="number"
                    className="token-name"
                    id="token-name"
                    placeholder="1"
                    onChange={e => {
                      setTokenQuantity(e.target.value);
                    }}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Issue new tokens</legend>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="light" color="indigo">
                  <span
                    className="create-token--btn"
                    style={{
                      fontSize: "1.5rem",
                      textDecoration: "none !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IoIosCreate></IoIosCreate>
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    ></span>
                    Issue Tokens
                  </span>
                </Button>

                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    setTokenCountModal(false);
                  }}
                >
                  <span
                    className="create-token--btn"
                    style={{
                      fontSize: "1.5rem",
                      textDecoration: "none !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ImCancelCircle></ImCancelCircle>
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    ></span>
                    Cancel
                  </span>
                </Button>
              </span>
              <br />
              <br />
            </fieldset>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenCountModal;

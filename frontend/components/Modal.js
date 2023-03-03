import React, { useState } from "react";

const Modal = ({ modal, setModal }) => {
  console.log("Modal");
  return (
    <>
      {modal && (
        <div className="modal-container">
          <div
            className="modal-bg"
            onClick={e => {
              setModal(false);
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Modal;

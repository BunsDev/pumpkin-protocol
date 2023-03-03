import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

const COINGECKO_PRICE_FEED_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=aave,wrapped-fantom,dai,usd-coin,tether,binance-usd,wrapped-bitcoin,chainlink,true-usd,frax&vs_currencies=usd";
const Modal = ({ modal, setModal }) => {
  const [coinPriceData, setCoinPriceData] = useState({});
  const [timestamp, setTimestamp] = useState(Date.now());
  const [approxTokenPrice, setApproxTokenPrice] = useState(0);
  const [dai, setDai] = useState(0);
  const [usdc, setUsdc] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [busd, setBusd] = useState(0);
  const [wbtc, setWbtc] = useState(0);
  const [link, setLink] = useState(0);
  const [wftm, setWftm] = useState(0);
  const [aave, setAave] = useState(0);
  const [tusd, setTusd] = useState(0);
  const [frax, setFrax] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const calculateIndexTokenPrice = () => {
    const price =
      (dai / 100) * parseFloat(coinPriceData[tokenSymbolAddress.dai.id].usd) +
      (usdc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdc.id].usd) +
      (usdt / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdt.id].usd) +
      (busd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.busd.id].usd) +
      (wbtc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wbtc.id].usd) +
      (link / 100) * parseFloat(coinPriceData[tokenSymbolAddress.link.id].usd) +
      (wftm / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wftm.id].usd) +
      (aave / 100) * parseFloat(coinPriceData[tokenSymbolAddress.aave.id].usd) +
      (tusd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.tusd.id].usd) +
      (frax / 100) * parseFloat(coinPriceData[tokenSymbolAddress.frax.id].usd);

    setApproxTokenPrice(price);
  };
  const tokenSymbolAddress = {
    dai: {
      symbol: "dai",
      id: "dai",
    },
    usdc: {
      symbol: "usdc",
      id: "usd-coin",
    },
    usdt: {
      symbol: "usdt",
      id: "tether",
    },
    busd: {
      symbol: "busd",
      id: "binance-usd",
    },
    wbtc: {
      symbol: "wbtc",
      id: "wrapped-bitcoin",
    },
    link: {
      symbol: "link",
      id: "chainlink",
    },
    wftm: {
      symbol: "wftm",
      id: "wrapped-fantom",
    },
    aave: {
      symbol: "aave",
      id: "aave",
    },
    tusd: {
      symbol: "tusd",
      id: "true-usd",
    },
    frax: {
      symbol: "frax",
      id: "frax",
    },
  };

  function updateTokenState(element) {
    if (element.id == "dai") {
      setDai(element.value);
    }
    if (element.id == "usdc") {
      setUsdc(element.value);
    }
    if (element.id == "usdt") {
      setUsdt(element.value);
    }
    if (element.id == "busd") {
      setBusd(element.value);
    }
    if (element.id == "wbtc") {
      setWbtc(element.value);
    }
    if (element.id == "chain-link") {
      setLink(element.value);
    }
    if (element.id == "wftm") {
      setWftm(element.value);
    }
    if (element.id == "aave") {
      setAave(element.value);
    }
    if (element.id == "tusd") {
      setTusd(element.value);
    }
    if (element.id == "frax") {
      setFrax(element.value);
    }
  }
  async function getPriceFeedData() {
    try {
      const data = await axios.get(COINGECKO_PRICE_FEED_URL);
      setCoinPriceData(data.data);
      return true;
    } catch (err) {
      alert(err.message);
    }
  }
  async function handleChange(e) {
    if (Date.now() - timestamp > 5000 * 60) {
      console.log("Refreshing Price feeds after 5 minutes");
      getPriceFeedData();
      setTimestamp(Date.now());
    }
    let depends = document.querySelectorAll(".depend");
    updateTokenState(e.target);
    function c(current) {
      let input = current.value;
      let max = 100;
      let delta = max - parseInt(input);
      let sum = 0;
      let partial = 0;
      let siblings = [];

      // Sum of all siblings
      [].forEach.call(depends, function (depend) {
        if (current != depend) {
          siblings.push(depend); // Register as sibling
          sum += +depend.value;
        }
      });

      // Update all the siblings
      siblings.forEach(function (sibling, i) {
        let val = +sibling.value;
        let fraction = 0;

        // Calculate fraction
        if (sum <= 0) {
          fraction = 1 / (depends.length - 1);
        } else {
          fraction = val / sum;
        }

        // The last element will correct rounding errors
        if (i >= depends.length - 1) {
          val = max - partial;
        } else {
          val = Math.round(delta * fraction);
          partial += val;
        }

        // Check if total of all range is greater than max value
        let total = partial + parseInt(input);

        if (total > max) {
          let diff = total - max; // Calculate the difference
          val = val - diff; // Update the value
          partial = partial - diff;
        }

        s(sibling, val);
      });
    }

    function s(el, value) {
      let label = document.getElementById(el.id + "_percentage");

      label.innerHTML = value;
      el.value = value;
      updateTokenState(el);
    }

    s(e.target, e.target.value);
    c(e.target);
    calculateIndexTokenPrice();
  }
  useEffect(() => {
    try {
      axios.get(COINGECKO_PRICE_FEED_URL).then(res => {
        const data = res.data;
        setCoinPriceData(data);
      });
      console.log(coinPriceData);
    } catch (err) {
      alert(err.message);
    }
  }, []);
  return (
    <>
      {modal && (
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
                    className="token-name"
                    id="token-name"
                    placeholder="0x..."
                    onChange={e => {
                      setTokenAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Index Token Percentage</legend>
              {/* DAI */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">DAI</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={dai}
                    step="1"
                    onChange={handleChange}
                    id="dai"
                  />
                  <label id="dai_percentage">{dai}</label>%
                </div>
              </div>
              <br />
              {/* USDC */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">USDC</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={usdc}
                    step="1"
                    onChange={handleChange}
                    id="usdc"
                  />
                  <label id="usdc_percentage">{usdc}</label>%
                </div>
              </div>
              <br />
              {/* USDT */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">USDT</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={usdt}
                    step="1"
                    onChange={handleChange}
                    id="usdt"
                  />
                  <label id="usdt_percentage">{usdt}</label>%
                </div>
              </div>
              <br />
              {/* BUSD */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">BUSD</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={busd}
                    step="1"
                    onChange={handleChange}
                    id="busd"
                  />
                  <label id="busd_percentage">{busd}</label>%
                </div>
              </div>
              <br />
              {/* WBTC */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">WBTC</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={wbtc}
                    step="1"
                    onChange={handleChange}
                    id="wbtc"
                  />
                  <label id="wbtc_percentage">{wbtc}</label>%
                </div>
              </div>
              <br />
              {/* LINK */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">LINK</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={link}
                    step="1"
                    onChange={handleChange}
                    id="chain-link"
                  />
                  <label id="chain-link_percentage">{link}</label>%
                </div>
              </div>
              <br />
              {/* WFTM */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">WFTM</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={wftm}
                    step="1"
                    onChange={handleChange}
                    id="wftm"
                  />
                  <label id="wftm_percentage">{wftm}</label>%
                </div>
              </div>
              <br />
              {/* AAVE */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">AAVE</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={aave}
                    step="1"
                    onChange={handleChange}
                    id="aave"
                  />
                  <label id="aave_percentage">{aave}</label>%
                </div>
              </div>
              <br />
              {/* TUSD */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">TUSD</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={tusd}
                    step="1"
                    onChange={handleChange}
                    id="tusd"
                  />
                  <label id="tusd_percentage">{tusd}</label>%
                </div>
              </div>
              <br />
              {/* FRAX */}
              <div className="underlying-token">
                <div className="token-label--container">
                  <label className="token-label">FRAX</label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="range"
                    className="depend"
                    min="0"
                    max="100"
                    value={frax}
                    step="1"
                    onChange={handleChange}
                    id="frax"
                  />
                  <label id="frax_percentage">{frax}</label>%
                </div>
              </div>

              <br />
            </fieldset>

            <fieldset>
              <legend>Update Token</legend>
              <div className="approx-token-price--container">
                Approx Value in USD :{" "}
                <span>${approxTokenPrice.toFixed(2)}</span>
              </div>
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
                    Update Token
                  </span>
                </Button>

                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    setModal(false);
                    setDai(0);
                    setUsdc(0);
                    setUsdt(0);
                    setBusd(0);
                    setWbtc(0);
                    setLink(0);
                    setWftm(0);
                    setAave(0);
                    setTusd(0);
                    setFrax(0);
                    setApproxTokenPrice(0);
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

export default Modal;

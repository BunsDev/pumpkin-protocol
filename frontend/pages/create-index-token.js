import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ethers } from "ethers";
import ERC20_ABI from "../constants/ERC20_ABI";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { PumpkinAddress } from "../constants/PumpkinAddress";

const COINGECKO_PRICE_FEED_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=weth,aave,wrapped-fantom,dai,usd-coin,tether,binance-usd,wrapped-bitcoin,chainlink,true-usd,frax&vs_currencies=usd";

const CreateIndexToken = () => {
  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3, authenticate, chainId, account, isWeb3Enabled } =
    useMoralis();
  const [coinPriceData, setCoinPriceData] = useState({});
  const [timestamp, setTimestamp] = useState(Date.now());
  const [approxTokenPrice, setApproxTokenPrice] = useState(0);
  const [dai, setDai] = useState(0);
  const [usdc, setUsdc] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [busd, setBusd] = useState(0);
  const [wbtc, setWbtc] = useState(0);
  const [weth, setWeth] = useState(0);
  const [wftm, setWftm] = useState(0);
  const [aave, setAave] = useState(0);
  const [tusd, setTusd] = useState(0);
  const [frax, setFrax] = useState(0);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const USDCAddress = "0x73778d5569E3798360C0F557CeB549092759A029";
  const WETHAddress = "0x31bF40f5642BCC6d41f28cccB2ADFB735722Bb30";
  const WBTCAddress = "0x7FA0D30b30aF032bd1d8453603D7Df948021eA60";
  const WFTMAddress = "0xeF35e201aaBEFe47Ff3e01c87ef6D35878588B0C";
  const AAVEAddress = "0x415cE4e20bD34F9620a926db1B6a9ca08424FCdb";

  const checkTokenRatio = () => {
    const sum = +usdc + +weth + +wbtc + +wftm + +aave;
    console.log(sum);
    if (sum != 100) {
      window.alert("Token ratios should total upto 100 %", "Ratio is:", sum);
      return false;
    }
    return true;
  };
  const resetValues = () => {
    setCoinPriceData(0);
    setUsdc(0);
    setWbtc(0);
    setWeth(0);
    setWftm(0);
    setAave(0);
    setTokenName("");
    setTokenSymbol("");
  };
  // WEB3
  const createTokenWeb3 = async () => {
    await enableWeb3();
    await authenticate();
    const utilityTokenAddress = [];
    const utilityTokenRatios = [];
    if (!checkTokenRatio()) return;
    if (weth > 0) {
      utilityTokenAddress.push(WETHAddress);
      utilityTokenRatios.push(weth);
    }
    if (usdc > 0) {
      utilityTokenAddress.push(USDCAddress);
      utilityTokenRatios.push(usdc);
    }
    if (aave > 0) {
      utilityTokenAddress.push(AAVEAddress);
      utilityTokenRatios.push(aave);
    }
    if (wbtc > 0) {
      utilityTokenAddress.push(WBTCAddress);
      utilityTokenRatios.push(wbtc);
    }
    if (wftm > 0) {
      utilityTokenAddress.push(WFTMAddress);
      utilityTokenRatios.push(wftm);
    }
    if (tokenName.length == 0 || tokenSymbol.length == 0) {
      window.alert("Token Name and Symbol cannot be empty");
      return;
    }
    /*
    try{
      
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    if(usdc > 0){
    const USDC = new ethers.Contract(USDCAddress, ERC20_ABI, provider )
    const USDCWithSigner = USDC.connect(signer);
    await USDCWithSigner.approve(PumpkinAddress, "1000000");
    }
    if(weth > 0) {
    const WETH = new ethers.Contract(WETHAddress, ERC20_ABI, provider )
    const WETHWithSigner = WETH.connect(signer);
    await WETHWithSigner.approve(PumpkinAddress, "1000000");
    }
    if (wbtc > 0) {
    const WBTC = new ethers.Contract(WBTCAddress, ERC20_ABI, provider )
    const WBTCWithSigner = WBTC.connect(signer);
    await WBTCWithSigner.approve(PumpkinAddress, "1000000");   
    }
    if (wftm > 0){
    const WFTM = new ethers.Contract(WFTMAddress, ERC20_ABI, provider )
    const WFTMWithSigner = WFTM.connect(signer);
    await WFTMWithSigner.approve(PumpkinAddress, "1000000");
    }
    if (aave > 0){
    const AAVE = new ethers.Contract(AAVEAddress, ERC20_ABI, provider )
    const AAVEWithSigner = AAVE.connect(signer);
    await AAVEWithSigner.approve(PumpkinAddress, "1000000");
    }
  }
    catch (err) {
      window.alert(err)
    }
    */
    {
      runContractFunction({
        params: {
          abi: PUMPKIN_ABI,
          contractAddress: PumpkinAddress, // specify the networkId
          functionName: "createToken",
          params: {
            _tokens: utilityTokenAddress,
            _percentages: utilityTokenRatios,
            _name: tokenName,
            _symbol: tokenSymbol,
          },
        },
        onError: error => console.log(error),
        onSuccess: data => {
          console.log(data);
          resetValues();
        },
      });
    }
  };

  const calculateIndexTokenPrice = () => {
    const price =
      /*(dai / 100) * parseFloat(coinPriceData[tokenSymbolAddress.dai.id].usd) +*/
      (usdc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdc.id].usd) +
      //(usdt / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdt.id].usd) +
      //(busd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.busd.id].usd) +
      (wbtc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wbtc.id].usd) +
      (weth / 100) * parseFloat(coinPriceData[tokenSymbolAddress.weth.id].usd) +
      (wftm / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wftm.id].usd) +
      (aave / 100) * parseFloat(coinPriceData[tokenSymbolAddress.aave.id].usd);
    //(tusd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.tusd.id].usd) +
    //(frax / 100) * parseFloat(coinPriceData[tokenSymbolAddress.frax.id].usd);

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
    weth: {
      symbol: "weth",
      id: "weth",
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
      setDai(+element.value);
    }
    if (element.id == "usdc") {
      setUsdc(+element.value);
    }
    if (element.id == "usdt") {
      setUsdt(+element.value);
    }
    if (element.id == "busd") {
      setBusd(+element.value);
    }
    if (element.id == "wbtc") {
      setWbtc(+element.value);
    }
    if (element.id == "weth") {
      setWeth(+element.value);
    }
    if (element.id == "wftm") {
      setWftm(+element.value);
    }
    if (element.id == "aave") {
      setAave(+element.value);
    }
    if (element.id == "tusd") {
      setTusd(+element.value);
    }
    if (element.id == "frax") {
      setFrax(+element.value);
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
      //   console.log(coinPriceData);
    } catch (err) {
      alert(err.message);
    }
  }, []);
  return (
    <>
      <div className="bg-container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      <div className="index-token--container">
        <fieldset>
          <legend>Token Info</legend>
          <div className="index-token">
            <div className="token-label--container">
              <label className="token-name--label">Token Name - </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="text"
                className="token-name"
                id="token-name"
                onChange={e => {
                  setTokenName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="index-token">
            <div className="token-label--container">
              <label className="token-name--label">Token Symbol - </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="text"
                className="token-symbol"
                id="token-name"
                onChange={e => {
                  setTokenSymbol(e.target.value);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Index Token Percentage</legend>
          {/* DAI */}
          {/*<div className="underlying-token">
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
              */}
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
          {/*<div className="underlying-token">
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
            */}
          {/* BUSD */}
          {/*
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
          */}
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
          {/* WETH */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">WETH</label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={weth}
                step="1"
                onChange={handleChange}
                id="weth"
              />
              <label id="weth_percentage">{weth}</label>%
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
          {/*
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
        */}
          {/* FRAX */}
          {/*
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
        */}
          <br />
        </fieldset>
        <fieldset>
          <legend>Token Action</legend>
          <div className="approx-token-price--container">
            Approx Value in USD : <span>${approxTokenPrice.toFixed(2)}</span>
          </div>
          <Button variant="light" color="indigo" onClick={createTokenWeb3}>
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
              Create Token
            </span>
          </Button>
          <br />
          <br />
        </fieldset>
      </div>
    </>
  );
};

export default CreateIndexToken;

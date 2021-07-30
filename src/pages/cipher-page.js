import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PageLayout from "../layout/page-layout";
import CryptoJS from "crypto-js";

const supportedModes = [
  { label: "CBC", value: CryptoJS.mode.CBC },
  { label: "CFB", value: CryptoJS.mode.CFB },
  { label: "CTR", value: CryptoJS.mode.CTR },
  { label: "OFB", value: CryptoJS.mode.OFB },
  { label: "ECB", value: CryptoJS.mode.ECB },
];
const supportedPaddingSchemes = [
  { label: "Pkcs7", value: CryptoJS.pad.Pkcs7 },
  { label: "Iso97971", value: CryptoJS.pad.Iso97971 },
  { label: "AnsiX923", value: CryptoJS.pad.AnsiX923 },
  { label: "Iso10126", value: CryptoJS.pad.Iso10126 },
  { label: "ZeroPadding", value: CryptoJS.pad.ZeroPadding },
  { label: "NoPadding", value: CryptoJS.pad.NoPadding },
];
const supportedAlgs = [
  { label: "AES", value: "aes" },
  { label: "3DES", value: "tripledes" },
  { label: "Rabbit", value: "rabbit" },
  { label: "RC4", value: "rc4" },
];
const supportedEncodings = [
  {
    label: "UTF-8",
    value: CryptoJS.enc.Utf8,
  },
  {
    label: "Base64",
    value: CryptoJS.enc.Base64,
  },
  {
    label: "Hexadecimal",
    value: CryptoJS.enc.Hex,
  },
];
export const path = "/cipher";
export const pageName = "Cipher Encoder/Decoder";
export default function CipherPage() {
  const [decipher, setDecipher] = useState(true);
  const [passphrase, setPassphrase] = useState(true);
  const [algIdx, setAlgIdx] = useState(0);
  const [encodingIdx, setEncodingIdx] = useState(0);
  const [modeIdx, setModeIdx] = useState(0);
  const [paddingIdx, setPaddingIdx] = useState(0);
  const [key, setKey] = useState("");
  const [keyEncodingIdx, setKeyEncodingIdx] = useState(0);
  const [iv, setIv] = useState("");
  const [ivEncodingIdx, setIvEncodingIdx] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const inputLabel = () => (decipher ? "Ciphertext" : "Plaintext");
  const passphraseLabel = () => (passphrase ? "Passphrase" : "Key");
  const toggleDecipher = () => setDecipher(!decipher);
  const togglePassphrase = () => setPassphrase(!passphrase);
  const onInputChange = (e) => setInput(e.target.value);
  const onIvChange = (e) => setIv(e.target.value);
  const onEncodingChange = (e) => setEncodingIdx(e.target.value);
  const onAlgChange = (e) => setAlgIdx(e.target.value);
  const onKeyChange = (e) => setKey(e.target.value);
  const onModeChange = (e) => setModeIdx(e.target.value);
  const onPaddingChange = (e) => setPaddingIdx(e.target.value);
  const onKeyEncodingChange = (e) => setKeyEncodingIdx(e.target.value);
  const onIvEncodingChange = (e) => setIvEncodingIdx(e.target.value);

  const encodingOptions = supportedEncodings.map((e, i) => (
    <option key={i} value={i}>
      {e.label}
    </option>
  ));
  const algOptions = supportedAlgs.map((e, i) => (
    <option key={i} value={i}>
      {e.label}
    </option>
  ));
  const modesOptions = supportedModes.map((e, i) => (
    <option key={i} value={i}>
      {e.label}
    </option>
  ));
  const paddingOptions = supportedPaddingSchemes.map((e, i) => (
    <option key={i} value={i}>
      {e.label}
    </option>
  ));

  const transformInput = () => {
    let result;
    if (!input) {
      return;
    }
    const cipher = require("crypto-js/" + supportedAlgs[algIdx].value);
    const mode = supportedModes[modeIdx].value;
    const padding = supportedPaddingSchemes[paddingIdx].value;
    const keyEncoding = supportedEncodings[keyEncodingIdx].value;
    let encodedKey = key;
    let options = { mode, padding };
    if (!passphrase) {
      const ivEncoding = supportedEncodings[ivEncodingIdx].value;
      encodedKey = keyEncoding.parse(key);
      options = { ...options, iv: ivEncoding.parse(iv) };
    }
    if (decipher) {
      try {
        const encoding = supportedEncodings[encodingIdx].value;
        result = cipher.decrypt(input, encodedKey, options).toString(encoding);
        setErrorMessage(null);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.toString());
        result = "";
      }
    } else {
      try {
        result = cipher.encrypt(input, encodedKey, options);
        result = result.toString();
        setErrorMessage(null);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.toString());
        result = "";
      }
    }
    setOutput(result);
  };

  useEffect(transformInput, [
    input,
    decipher,
    algIdx,
    key,
    iv,
    modeIdx,
    paddingIdx,
    encodingIdx,
    keyEncodingIdx,
    passphrase,
    ivEncodingIdx,
  ]);

  const inputClass = () => (errorMessage ? "is-invalid" : "");
  return (
    <PageLayout
      headerText={pageName}
      color="bg-primary"
      linkColor="text-danger"
    >
      <form>
        <div className="row form-group">
          <div className="col-0 col-md-9"></div>
          <div className="col-12 col-md-3 text-center">
            <BootstrapSwitchButton
              checked={decipher}
              onlabel="Decipher"
              onstyle="danger"
              offlabel="Cipher"
              offstyle="success"
              style="w-100"
              onChange={toggleDecipher}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <label htmlFor="alg">Algorithm</label>
            <select
              id="alg"
              className="form-control"
              value={algIdx}
              onChange={onAlgChange}
            >
              {algOptions}
            </select>
          </div>
          <div className="col">
            <label htmlFor="mode">Mode</label>
            <select
              id="mode"
              className="form-control"
              value={modeIdx}
              onChange={onModeChange}
            >
              {modesOptions}
            </select>
          </div>
          <div className="col">
            <label htmlFor="padding">Padding</label>
            <select
              id="padding"
              className="form-control"
              value={paddingIdx}
              onChange={onPaddingChange}
            >
              {paddingOptions}
            </select>
          </div>
          {decipher && (
            <div className="col">
              <label htmlFor="enc">Payload Encoding</label>
              <select
                id="enc"
                className="form-control"
                value={encodingIdx}
                onChange={onEncodingChange}
              >
                {encodingOptions}
              </select>
            </div>
          )}
        </div>
        <br />
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              id="key"
              onChange={onKeyChange}
              className="form-control"
              rows="5"
              placeholder={passphraseLabel()}
            />
          </div>{" "}
          {!passphrase && (
            <div className="col-2">
              <select
                id="keyEnc"
                className="form-control"
                value={keyEncodingIdx}
                onChange={onKeyEncodingChange}
              >
                {encodingOptions}
              </select>
            </div>
          )}
          <div className="col-2">
            <BootstrapSwitchButton
              checked={passphrase}
              onlabel="Passphrase"
              onstyle="danger"
              offlabel="Key/IV"
              offstyle="success"
              style="w-100"
              onChange={togglePassphrase}
            />
          </div>
        </div>
        <br />
        {!passphrase && (
          <>
            <div className="form-row">
              <div className="col-10">
                <input
                  type="text"
                  id="iv"
                  onChange={onIvChange}
                  className="form-control"
                  placeholder="IV"
                />
              </div>
              <div className="col-2">
                <select
                  id="ivEnc"
                  className="form-control"
                  value={ivEncodingIdx}
                  onChange={onIvEncodingChange}
                >
                  {encodingOptions}
                </select>
              </div>
            </div>
            <br />
          </>
        )}
        <div className="form-group">
          <textarea
            id="input"
            onChange={onInputChange}
            className={`form-control ${inputClass()}`}
            rows="5"
            placeholder={inputLabel()}
          />
          <div className="invalid-feedback">{errorMessage}</div>
          <br />
          <textarea
            id="output"
            rows="5"
            readOnly
            value={output}
            className="form-control bg-secondary text-white"
          />
        </div>
      </form>
    </PageLayout>
  );
}

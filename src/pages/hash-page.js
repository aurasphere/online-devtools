import React, { useState, useEffect } from "react";
import PageLayout from "./page-layout";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";

const supportedAlgs = [
  { label: "MD5", value: "md5" },
  { label: "SHA-1", value: "sha1" },
  { label: "SHA-256", value: "sha256" },
  { label: "SHA-224", value: "sha224" },
  { label: "SHA-512", value: "sha512" },
  { label: "SHA-384", value: "sha384" },
  {
    label: "SHA-3 (512 bits)",
    value: "sha3",
    additionalArgs: { outputLength: 512 },
  },
  {
    label: "SHA-3 (384 bits)",
    value: "sha3",
    additionalArgs: { outputLength: 384 },
  },
  {
    label: "SHA-3 (256 bits)",
    value: "sha3",
    additionalArgs: { outputLength: 256 },
  },
  {
    label: "SHA-3 (224 bits)",
    value: "sha3",
    additionalArgs: { outputLength: 224 },
  },
  { label: "RIPEMD-160", value: "ripemd160" },
];

const supportedEncodings = [
  {
    label: "Base64",
    value: Base64,
  },
  {
    label: "Hexadecimal",
    value: Hex,
  },
];
export const path = "/hash";
export const pageName = "Hash";
export default function HashPage() {
  const [algIdx, setAlgIdx] = useState(0);
  const [encodingIdx, setEncodingIdx] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onInputChange = (e) => setInput(e.target.value);
  const onEncodingChange = (e) => setEncodingIdx(e.target.value);
  const onAlgChange = (e) => setAlgIdx(e.target.value);

  const transformInput = () => {
    const alg = supportedAlgs[algIdx];
    const encoding = supportedEncodings[encodingIdx].value;
    const hasher = require("crypto-js/" + alg.value);
    const result = hasher(input, alg.additionalArgs).toString(encoding);
    setOutput(result);
  };

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

  useEffect(transformInput, [input, algIdx, encodingIdx]);

  return (
    <PageLayout headerText={pageName}>
      <form>
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
            <label htmlFor="enc">Encoding</label>
            <select
              id="enc"
              className="form-control"
              value={encodingIdx}
              onChange={onEncodingChange}
            >
              {encodingOptions}
            </select>
          </div>
        </div>
        <br />
        <div className="form-group">
          <textarea
            onChange={onInputChange}
            className="form-control"
            rows="5"
            placeholder="Payload"
          />
          <br />
          <textarea
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

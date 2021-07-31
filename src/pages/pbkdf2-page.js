import React, { useState, useEffect } from "react";
import PageLayout from "./page-layout";
import CryptoJS from "crypto-js";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

export const path = "/pbkdf2";
export const pageName = "PBKDF2";
export default function Pbkdf2Page() {
  const [salt, setSalt] = useState("");
  const [randomSalt, setRandomSalt] = useState(0);
  const [keyLength, setKeyLength] = useState(0);
  const [passPhrase, setPassPhrase] = useState("");
  const [iterations, setIterations] = useState(0);
  const [output, setOutput] = useState("");

  const toggleRandomSalt = () => setRandomSalt(!randomSalt);
  const onSaltChange = (e) => setSalt(e.target.value);
  const onKeyLengthChange = (e) => setKeyLength(e.target.value);
  const onPassPhraseChange = (e) => setPassPhrase(e.target.value);
  const onIterationsChange = (e) => setIterations(e.target.value);

  const transformInput = () => {
    if (!keyLength) {
      return;
    }
    const finalSalt = randomSalt
      ? CryptoJS.lib.WordArray.random(128 / 8)
      : salt;
    const result = CryptoJS.PBKDF2(passPhrase, finalSalt, {
      keySize: keyLength / 32,
      iterations,
    });
    setOutput(result);
  };

  useEffect(transformInput, [
    salt,
    randomSalt,
    passPhrase,
    keyLength,
    iterations,
  ]);

  return (
    <PageLayout headerText={pageName}>
      <form>
        <div className="form-row">
          <div className="col">
            <input
              type="number"
              onChange={onIterationsChange}
              className="form-control"
              placeholder="Iterations"
            />
          </div>
          <div className="col">
            <input
              type="number"
              onChange={onKeyLengthChange}
              className="form-control"
              placeholder="Key Length (bits)"
              required
            />
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              onChange={onSaltChange}
              className="form-control"
              placeholder="Salt"
              disabled={randomSalt}
            />
          </div>
          <div className="col-2">
            <BootstrapSwitchButton
              checked={randomSalt}
              onlabel="Random"
              onstyle="danger"
              offlabel="Fixed"
              offstyle="success"
              style="w-100"
              onChange={toggleRandomSalt}
            />
          </div>
        </div>
        <br />

        <div className="form-row">
          <div className="col">
            <input
              type="text"
              onChange={onPassPhraseChange}
              className="form-control"
              placeholder="Pass Phrase"
            />
          </div>
        </div>
        <br />
        <div className="form-group">
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

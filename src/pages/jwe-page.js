import React, { useState, useEffect } from "react";
import PageLayout from "./page-layout";

var jose = require("node-jose");
const JSONPretty = require("react-json-pretty");
const JSONPrettyTheme = require("react-json-pretty/dist/acai");

export const path = ["/", "/jwe", "/jwt"];
export const pageName = "JWT/JWE Decrypter";
export default function JwePage() {
  const [tokenType, setTokenType] = useState(null);
  const [errorKey, setErrorKey] = useState(false);
  const [errorToken, setErrorToken] = useState(false);
  const [decodedTokenPayload, setDecodedTokenPayload] = useState("");
  const [decodedTokenHeaders, setDecodedTokenHeaders] = useState("");
  const [token, setToken] = useState("");
  const [key, setKey] = useState("");

  const onTokenChange = (e) => setToken(e.target.value);
  const onKeyChange = (e) => setKey(e.target.value);

  const resetFields = () => {
    setDecodedTokenHeaders("");
    setDecodedTokenPayload("");
    setErrorKey(false);
    setErrorToken(false);
    setTokenType(null);
  };

  const decodeToken = () => {
    if (!token) {
      resetFields();
      return;
    }
    switch (token.split(".").length) {
      case 3:
        setTokenType("JWT");
        setErrorKey(false);
        decodeJwt();
        break;
      case 5:
        setTokenType("JWE");
        decodeJwe();
        break;
      default:
        resetFields();
        setErrorToken(true);
        break;
    }
  };

  const decodeJwt = () => {
    try {
      const tokenComponents = token.split(".");
      const headers = JSON.stringify(JSON.parse(atob(tokenComponents[0])));
      const payload = JSON.stringify(JSON.parse(atob(tokenComponents[1])));
      setDecodedTokenHeaders(headers);
      setDecodedTokenPayload(payload);
      setErrorToken(false);
    } catch (error) {
      console.log("Error during JWT decoding: " + error);
      setDecodedTokenHeaders("");
      setDecodedTokenPayload("");
      setErrorToken(true);
    }
  };

  const decodeJwe = async () => {
    const jwkKey = await jose.JWK.asKey({
      k: jose.util.base64url.encode(key),
      kty: "oct",
    });
    try {
      const decrypted = await jose.JWE.createDecrypt(jwkKey).decrypt(token);
      const payload = decrypted.payload.toString();
      const headers = decrypted.header;
      setDecodedTokenHeaders(headers);
      setDecodedTokenPayload(payload);
      setErrorKey(false);
    } catch (err) {
      console.log("Error: is the key wrong? " + err);
      setDecodedTokenHeaders("");
      setDecodedTokenPayload("");
      setErrorKey(true);
    }
  };

  useEffect(decodeToken, [token, key]);

  return (
    <PageLayout headerText={pageName}>
      <form>
        <div className="form-group">
          <textarea
            onChange={onTokenChange}
            className={`form-control ${
              !token ? "" : errorToken ? "is-invalid" : "is-valid"
            }`}
            rows="5"
            placeholder="JWT/JWE"
          />
          <div className="valid-feedback">{tokenType}</div>
          <div className="invalid-feedback">{`INVALID ${
            tokenType ? tokenType.toUpperCase() : "TOKEN"
          }`}</div>
          <br />
          {tokenType !== "JWT" && (
            <div>
              <input
                type="text"
                onChange={onKeyChange}
                className={`form-control ${errorKey ? "is-invalid" : ""}`}
                placeholder="Key"
              />
              <div className="invalid-feedback">INVALID KEY OR TOKEN</div>
              <br />
              <br />
            </div>
          )}
          {(decodedTokenPayload || decodedTokenHeaders) && (
            <div>
              <div className="row justify-content-center">
                <div className="col-md-5 col-sm-12 p-0">
                  <h4 className="text-danger">Headers</h4>
                  <JSONPretty
                    data={decodedTokenHeaders}
                    theme={JSONPrettyTheme}
                  />
                </div>
                <div className="col-1"></div>
                <div className="col-md-5 col-sm-12 p-0">
                  <h4 className="text-info">Payload</h4>
                  <JSONPretty
                    data={decodedTokenPayload}
                    theme={JSONPrettyTheme}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </PageLayout>
  );
}

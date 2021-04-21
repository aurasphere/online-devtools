import React, { useState } from 'react';

import Header from "../components/header";
var jose = require('node-jose');
var JSONPretty = require('react-json-pretty');
var JSONPrettyTheme = require('react-json-pretty/dist/acai');

function JweDecrypterPage() {
    const [tokenType, setTokenType] = useState("");
    const [decodedTokenPayload, setDecodedTokenPayload] = useState("");
    const [decodedTokenHeaders, setDecodedTokenHeaders] = useState("");
    const [token, setToken] = useState("");
    const [key, setKey] = useState("");
    const [errorKey, setErrorKey] = useState(false);

    const recomputeToken = async (token, key) => {
        const [tokenType, decodedToken, decodedHeaders, errorKey] = await decodeToken(token, key);
        console.log(tokenType)
        console.log(decodedToken)
        setTokenType(tokenType);
        setDecodedTokenPayload(decodedToken);
        setDecodedTokenHeaders(decodedHeaders);
        setErrorKey(errorKey);
    }

    const onTokenChange = e => {
        const token = e.target.value;
        setToken(token);
        recomputeToken(token, key);
    }
    const onKeyChange = e => {
        const key = e.target.value;
        setKey(key);
        recomputeToken(token, key);
    }

    const tokenInputClass = () => {
        switch (tokenType) {
            case "INVALID": return "is-invalid";
            case "JWT":
            case "JWE": return "is-valid";
            default: return "";
        }
    };

    return (
        <div >
            <Header text="JWT/JWE Decrypter" />
            <form class="p-5">
                <p>Insert a JWE token and the key to decrypt them. All the operations are performed in your browser and no data is sent anywhere. The source code <a href="https://github.com/aurasphere/online-devtools">is available on GitHub.</a></p>
                <div class="form-group">
                    <label for="jwe">JWT/JWE</label>
                    <textarea id="jwe" onChange={onTokenChange}
                        className={`form-control ${tokenInputClass()}`}
                        rows="5" placeholder="JWT/JWE" />
                    <div class="valid-feedback">{tokenType}</div>
                    <div class="invalid-feedback">INVALID TOKEN</div>
                    <label for="key">Key</label>
                    <input id="key" type="text" onChange={onKeyChange}
                        className={`form-control ${errorKey ? "is-invalid" : ""}`} placeholder="Key" />
                    <div class="invalid-feedback">INVALID KEY</div>
                    <br />
                    <br />
                    {(decodedTokenPayload || decodedTokenHeaders) &&
                        <div>
                            <div class="row justify-content-center">
                                <h3>Decrypted token</h3>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-5 col-sm-12">
                                    
                                </div>
                                <div class="col-1"></div>
                                <div class="col-md-5 col-sm-12">
                                   
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-5 col-sm-12 p-0">
                                    <h4 class="text-danger">Headers</h4>
                                    <JSONPretty data={decodedTokenHeaders} theme={JSONPrettyTheme}></JSONPretty>
                                </div>
                                <div class="col-1"></div>
                                <div class="col-md-5 col-sm-12 p-0">
                                    <h4 class="text-info">Payload</h4>
                                    <JSONPretty data={decodedTokenPayload} theme={JSONPrettyTheme}></JSONPretty>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}

async function decodeToken(token, key) {
    let tokenType;
    let decodedToken;
    let decodedHeaders;
    let isError;
    switch (token.split(".").length) {
        case 3:
            tokenType = "JWT";
            decodedToken = await decodeJwt(token, key);
            break;
        case 5:
            tokenType = "JWE";
            [decodedToken, decodedHeaders, isError] = await decodeJwe(token, key);
            break;
        default:
            tokenType = "INVALID";
            break;
    }
    return [tokenType, decodedToken, decodedHeaders, isError];
}

async function decodeJwt(token, key) {
    const { payload, protectedHeader } = []
        ;
    //      rsa_key = Jose.Utils.importRsaPublicKey(rsa_key, "RSA-OAEP-256");
    //       encrypt = new JoseJWE.Encrypter(crypto , rsa_key);
    //await jwtDecrypt(token, key);
    return payload;
}

async function decodeJwe(token, key) {
    const jwkKey = await jose.JWK.asKey({ k: jose.util.base64url.encode(key), kty: "oct" });
    let payload = "";
    let headers = "";
    let isError = false;
    try {
        const decrypted = await jose.JWE.createDecrypt(jwkKey).decrypt(token);
        console.log(decrypted);
        payload = decrypted.payload.toString()
        headers = decrypted.header
    } catch (err) {
        isError = true;
        console.log("Error: is the key wrong? " + err);
    }

    return [payload, headers, isError];
}

export default JweDecrypterPage;
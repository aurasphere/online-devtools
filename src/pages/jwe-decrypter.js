import React, { useState } from 'react';

import Header from "../components/header";
var joses = require('node-jose');

function JweDecrypterPage() {

    const [tokenType, setTokenType] = useState("INVALID");
    const [decodedToken, setDecodedToken] = useState("{}");
    const [token, setToken] = useState("");
    const [key, setKey] = useState("");
    const [errorKey, setErrorKey] = useState(false);

    const recomputeToken = async (token, key) => {
        const [tokenType, decodedToken, errorKey] = await decodeToken(token, key);
        console.log(tokenType)
        console.log(decodedToken)
        setTokenType(tokenType);
        setDecodedToken(decodedToken);
        setErrorKey(errorKey);
    }

    const onTokenChange = e => {
        const token = e.target.value;
        console.log("Current token" + token);
        setToken(token);
        recomputeToken(token, key);
    }
    const onKeyChange = e => {
        const key = e.target.value;
        console.log("Current key " + key);
        setKey(key);
        recomputeToken(token, key);
    }

    return (
        <div >
            <Header text="JWT/JWE Decrypter" />
            <form class="p-5">
                <div class="form-group">
                    <input type="textarea" onChange={onTokenChange} className={`form-control ${tokenType === "INVALID" ? "is-invalid" : ""}`} />
                    <p>Token type: {tokenType}</p>
                    <input type="text" onChange={onKeyChange} className={`form-control ${errorKey ? "is-invalid" : ""}`} />
                    <p>Decoded token: {decodedToken}</p>
                </div>
            </form>
        </div>
    );
}

async function decodeToken(token, key) {
    let tokenType;
    let decodedToken;
    let isError;
    console.log("decode");
    switch (token.split(".").length) {
        case 3:
            tokenType = "JWT";
            decodedToken = await decodeJwt(token, key);
            break;
        case 5: tokenType = "JWE";
            [decodedToken, isError] = await decodeJwe(token, key);
            break;
        default: tokenType = "INVALID";
            break;
    }
    return [tokenType, decodedToken, isError];
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
    console.log("Decode, token: " + token + " key: " + key)
    const decoder = new TextDecoder();
    const { plaintext, protectedHeader } = [];
    //   const cryptographer = new Jose.WebCryptographer();
    //   const crypto = new Jose.JoseJWE.Decrypter(cryptographer,);
    //   crypto.setKeyEncryptionAlgorithm("A256KW");
    //   crypto.setContentEncryptionAlgorithm("A128CBC-HS256")


    //await compactDecrypt(token, key);
    const jwkKey = await joses.JWK.asKey({ k: joses.util.base64url.encode(key), kty: "oct" });
    console.log(jwkKey.toJSON(true));
    let result = "";
    let isError = false;
    try {
        const decrypted = await joses.JWE.createDecrypt(jwkKey).decrypt(token)
        result = decrypted.payload.toString()
    } catch (err) {
        isError = true;
        console.log("Error: is the key wrong? " + err);
    }

    return [result, isError];
}

export default JweDecrypterPage;
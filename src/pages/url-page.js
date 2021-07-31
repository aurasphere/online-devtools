import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PageLayout from "./page-layout";

export const path = "/url";
export const pageName = "URL Encoder/Decoder";
export default function UrlPage() {
  const [decode, setDecode] = useState(true);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const toggleDecode = () => setDecode(!decode);
  const onInputChange = (e) => setInput(e.target.value);
  const inputPlaceholder = () => (decode ? "Encoded URL" : "Payload");

  const transformInput = () => {
    let result;
    if (decode) {
      try {
        result = decodeURI(input);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.toString());
        result = "";
      }
    } else {
      setErrorMessage(null);
      result = encodeURI(input);
    }
    setOutput(result);
  };

  useEffect(transformInput, [input, decode]);

  const inputClass = () => (errorMessage ? "is-invalid" : "");

  return (
    <PageLayout headerText={pageName}>
      <form>
        <div className="row form-group">
          <div className="col-0 col-md-9"></div>
          <div className="col-12 col-md-3 text-center">
            <BootstrapSwitchButton
              checked={decode}
              onlabel="Decoder"
              onstyle="danger"
              offlabel="Encoder"
              offstyle="success"
              style="w-100"
              onChange={toggleDecode}
            />
          </div>
        </div>

        <div className="form-group">
          <textarea
            onChange={onInputChange}
            className={`form-control ${inputClass()}`}
            rows="5"
            placeholder={inputPlaceholder()}
          />
          <div className="invalid-feedback">{errorMessage}</div>
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

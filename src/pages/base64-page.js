import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PageLayout from "../layout/page-layout";

export const path = "/base64";
export const pageName = "Base64 Encoder/Decoder";
export default function Base64Page() {
  const [decode, setDecode] = useState(true);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const toggleDecode = () => setDecode(!decode);
  const onInputChange = (e) => setInput(e.target.value);
  const inputPlaceholder = () => (decode ? "Base64 string" : "Payload");

  const transformInput = () => {
    let result;
    if (decode) {
      try {
        result = atob(input);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.toString());
        result = "";
      }
    } else {
      setErrorMessage(null);
      result = btoa(input);
    }
    setOutput(result);
  };

  useEffect(transformInput, [input, decode]);

  const inputClass = () => (errorMessage ? "is-invalid" : "");

  const readFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setInput(reader.result);
  };
  const resetFileValue = (e) => (e.target.value = "");

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
        <div className="col-12 col-md-3 text-center">
          <input
            type="file"
            onChange={readFile}
            onClick={resetFileValue}
            onTouchStart={resetFileValue}
          />
        </div>
        <br />

        <div className="form-group">
          <textarea
            id="input"
            onChange={onInputChange}
            className={`form-control ${inputClass()}`}
            rows="5"
            placeholder={inputPlaceholder()}
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

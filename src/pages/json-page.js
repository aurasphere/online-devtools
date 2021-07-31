import React, { useState } from "react";
import PageLayout from "./page-layout";
const JSONPretty = require("react-json-pretty");
const JSONPrettyTheme = require("react-json-pretty/dist/acai");

export const path = "/json";
export const pageName = "JSON pretty print";
export default function JsonPage() {
  const [input, setInput] = useState("");
  const onInputChange = (e) => setInput(e.target.value);

  return (
    <PageLayout headerText={pageName}>
      <form>
        <div className="form-group">
          <textarea
            onChange={onInputChange}
            className={`form-control`}
            rows="5"
            placeholder="JSON"
          />
          <br />
          <JSONPretty data={input} theme={JSONPrettyTheme} />
        </div>
      </form>
    </PageLayout>
  );
}

import React from "react";
import { Heading } from "react-bulma-components";

export const TestTab = () => {
  return (
    <div>
      <Heading size={3} style={{ marginTop: "20px" }}>
        Test Embedding
      </Heading>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Search
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Write something here ..."
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label">{/* Left empty for spacing */}</div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button className="button is-link">Test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Heading } from "react-bulma-components";
interface Settingsprop {
  handleCheckboxChange: () => void;
  isEmbeddingEnabled: boolean;
}
export const SettingsTab: React.FC<Settingsprop> = ({
  handleCheckboxChange,
  isEmbeddingEnabled,
}) => {
  return (
    <div>
      <Heading size={3} style={{ marginTop: "20px" }}>
        Settings
      </Heading>

      {/* <label className="checkbox">
                          <input type="checkbox" style={{ marginRight: '20px' }} />
                          Enable embedding
                      </label> */}

      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label" style={{ marginRight: "20px" }}>
            Enable Embedding
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  style={{ marginRight: "10px" }}
                  checked={isEmbeddingEnabled}
                  onChange={handleCheckboxChange}
                />
                {isEmbeddingEnabled ? "Enabled" : "Disabled"}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Minimum Score
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="number"
                placeholder="score"
                min={0}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label">{/* Left empty for spacing */}</div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button className="button is-link">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

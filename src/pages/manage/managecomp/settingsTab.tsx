import React, { useEffect, useState } from "react";
import { Button, Heading } from "react-bulma-components";
interface Settingsprop {
  handleCheckboxChange: () => void;
  isEmbeddingEnabled: boolean;
}

interface SettingsInterface {
  enableEmbedding: boolean;
  minimumScore: number;
}
interface TestInterface {
  _id: string;
  input: string;
  title: string;
  score: number;
  solution?: string;
}

export const SettingsTab: React.FC<Settingsprop> = ({
  handleCheckboxChange,
  isEmbeddingEnabled,
}) => {
  const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [settingsData, setSettingsData] = useState<SettingsInterface>({
    enableEmbedding: false,
    minimumScore: 90,
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const token = localStorage.getItem("token");
  // Function to fetch and update settings
  const getSettings = () => {
    setLoadingSave(true);
    fetch(`${endPoint}/getSettings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSettingsData(res);
      })
      .finally(() => {
        setLoadingSave(false);
      })
      .catch((e) => console.log(e));
  };
  // Function to save settings
  const handleSaveSettings = () => {
    setLoadingSave(true);
    fetch(`${endPoint}/saveSettings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        settingsData: settingsData,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTestResults(res.related);
      })
      .finally(() => {
        setLoadingSave(false);
      });
  };
  // Function to update settings fields
  const updateSettingsFields = (field: string, value: any) => {
    setSettingsData({
      ...settingsData,
      [field]: value,
    });
  };
  // Fetch and update settings on component mount
  useEffect(() => {
    getSettings();
  }, []);

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
                  checked={settingsData.enableEmbedding}
                  onChange={(e) =>
                    updateSettingsFields("enableEmbedding", e.target.checked)
                  }
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
                onChange={(e) =>
                  updateSettingsFields("minimumScore", e.target.value)
                }
                value={settingsData.minimumScore}
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
              <Button
                color="link"
                onClick={handleSaveSettings}
                loading={loadingSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

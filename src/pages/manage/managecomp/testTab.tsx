import React, { useState } from "react";
import { Heading, Table } from "react-bulma-components";
import { handleTestEmbeddings } from "../../../components/dbFunctions/searchEmbeddings";

interface TestInterface {
  _id: string;
  input: string;
  title: string;
  score: number;
  solution?: string;
}
export const TestTab = () => {
  const [testDocument, setTestDocument] = useState("");
  const [loadingTest, setLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const handleSearch = async () => {
    setLoadingTest(true);

    await handleTestEmbeddings(testDocument)
      .then((res) => {
        setTestResults(res.related);
      })
      .finally(() => {
        setLoadingTest(false);
      });
  };
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
                onChange={(e) => setTestDocument(e.target.value)}
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
              <button onClick={handleSearch} className="button is-link">
                Test
              </button>
            </div>
          </div>
        </div>
      </div>
      {testResults && testResults.length > 0 && (
        <Table.Container>
          <Table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Solution</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((test) => {
                return (
                  <tr>
                    <td>{test.input.substring(0, 100)}...</td>
                    <td>{test.solution}</td>
                    <td>{test.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Table.Container>
      )}
    </div>
  );
};

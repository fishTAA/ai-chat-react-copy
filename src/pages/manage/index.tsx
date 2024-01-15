import React, { useEffect, useState } from "react";
import {
  Hero,
  Box,
  Button,
  Container,
  Form,
  Heading,
  Notification,
  Section,
  Table,
  Tile,
} from "react-bulma-components";
import Chat from "../../components/chat";
import { FooterSection } from "../../components/Footer";
import { NavigationBar } from "../../components/NavigationBar";
import image from "../../media/image.png";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import AdminPage from "../../components/AdminPage";
import Select from "react-select";
import {
  Category,
  FetchCategories,
} from "../../components/dbFunctions/fetchCategories";

interface TestInterface {
  _id: string;
  input: string;
  title: string;
  score: number;
  solution?: string;
}

interface SettingsInterface {
  enableEmbedding: boolean;
  minimumScore: number;
}
interface options {
  value: string;
  label: string;
}

function Manage() {
  const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [loadingEmbedding, setLoadingEmbedding] = useState(false);
  const [loadingTest, setLoadingTest] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentKeyword, setDocumentKeyword] = useState("");
  const [document, setDocument] = useState("");
  const [testDocument, setTestDocument] = useState("");
  const [embeddingNotification, setEmbeddingNotification] = useState<any>(
    <></>
  );
  //array to be sent in create emebeddings
  const [documentCategory, setDocumentCategory] = useState<Array<options>>([]);

  const [createEmbeddingSuccess, setCreateEmbeddingSuccess] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  //variable where
  const [categories, setCategories] = useState<Array<Category>>();
  const [selectOption, setSelectOption] = useState<Array<options>>([]);
  const [settingsData, setSettingsData] = useState<SettingsInterface>({
    enableEmbedding: false,
    minimumScore: 90,
  });

  let navigate = useNavigate();

  //collapsing RELATED TOPICS
  const isAuthenticated = useIsAuthenticated();

  const { instance, inProgress } = useMsal();
  const account = localStorage.getItem("account") || "{}";

  // Ensure authentication before performing certain actions
  // useEffect(()=> {
  //   if (inProgress === InteractionStatus.None && !isAuthenticated) {
  //     setLoadingTest(true)
  //     if(account) {
  //       instance.acquireTokenSilent({
  //         account: JSON.parse(account),
  //         scopes: ["openid", "profile"],
  //       }).then(e => {
  //         setLoadingTest(false);
  //       }).catch(e=> {
  //         console.log("here", e)
  //         navigate('/login')
  //       });
  //     } else {
  //       navigate('/login')
  //     }
  //   }
  // }, [inProgress]);

  // Function to create embeddings
  const handleCreateEmbeddings = () => {
    setCreateEmbeddingSuccess(false);
    setLoadingEmbedding(true);
    fetch(`${endPoint}/createEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: documentTitle,
        keyword: document,
        input: documentKeyword,
        categories: documentCategory.map((option) => option.value),
      }),
    })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        setDocument("");
        setEmbeddingNotification(
          <Notification color="success">Embedding Created</Notification>
        );
        setCreateEmbeddingSuccess(true);
      })
      .finally(() => {
        setLoadingEmbedding(false);
      });
  };

  // Function to save settings
  const handleSaveSettings = () => {
    setLoadingSave(true);
    fetch(`${endPoint}/saveSettings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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

  // Function to fetch and update settings
  const getSettings = () => {
    setLoadingSave(true);
    fetch(`${endPoint}/getSettings`, {
      headers: {
        "Content-Type": "application/json",
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

  // Function to update settings fields
  const updateSettingsFields = (field: string, value: any) => {
    setSettingsData({
      ...settingsData,
      [field]: value,
    });
  };

  // Function to test embeddings
  const handleTestEmbeddings = () => {
    setLoadingTest(true);
    fetch(`${endPoint}/testEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: testDocument,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTestResults(res.related);
      })
      .finally(() => {
        setLoadingTest(false);
      });
  };
  //Function to set option of React-Select set the value to objcid of category
  const SetOptions = (categories: Category[] | undefined) => {
    if (categories) {
      const newoptions = categories.map((category: Category) => ({
        value: category._id,
        label: category.label,
      }));
      setSelectOption(newoptions);
    }
  };
  // Fetch and update settings on component mount
  useEffect(() => {
    getSettings();
  }, []);
  //sets categories and option during onload of page
  useEffect(() => {
    FetchCategories().then((categories) => {
      setCategories(categories);
      SetOptions(categories);
    });
  }, []);

  return (
    <Hero
      hasNavbar={true}
      size="fullheight"
      style={{
        backgroundColor: "#A7C6ED",
        backgroundImage: `url(${image})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <NavigationBar />
      <AdminPage>
        <Box
          style={{
            margin: 20,
            marginTop: "100px",
            padding: 0,
            paddingTop: "20px",
          }}
        >
          <Section
            style={{ paddingTop: 0, paddingBottom: 0, marginBottom: 15 }}
          >
            <Heading size={3}>Embeddings</Heading>
            <Box shadowless style={{ paddingTop: 0 }}>
              <Section size="small" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Heading size={4}>Create Embedding</Heading>
                {embeddingNotification}
                <Form.Field>
                  <Form.Control>
                    {/* Topic Area */}
                    <Form.Label>Title</Form.Label>
                    <Form.Control>
                      <Form.Input
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="Enter Title"
                        type="text"
                      />
                    </Form.Control>

                    {/* keywords Area */}
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control>
                      <Form.Input
                        onChange={(e) => setDocumentKeyword(e.target.value)}
                        placeholder="e.g. mouse problem"
                        type="text"
                      />
                    </Form.Control>

                    {/* Categories Area */}
                    <Form.Label>Categories</Form.Label>
                    <Select
                      isMulti
                      name="colors"
                      options={selectOption}
                      // value={documentCategory}
                      onChange={(selectedOptions: any) =>
                        setDocumentCategory(selectedOptions)
                      }
                      placeholder="Select a category"
                    />

                    {/* description area */}
                    <Form.Label>Description / Solution</Form.Label>
                    <Form.Textarea
                      id="textareaDescription"
                      onChange={(e) => setDocument(e.target.value)}
                      value={document}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field kind="group">
                  <Form.Control>
                    <Button
                      style={{ boxShadow: "0px 0px 5px #888888" }}
                      color="link"
                      onClick={handleCreateEmbeddings}
                      loading={loadingEmbedding}
                    >
                      Create Embedding
                    </Button>
                  </Form.Control>
                </Form.Field>
              </Section>
              <Section size="small" style={{ paddingBottom: 0 }}>
                <Heading size={4}>Test Embedding</Heading>
                <Form.Field>
                  <Form.Control>
                    <Form.Textarea
                      onChange={(e) => setTestDocument(e.target.value)}
                      // value={testDocument}
                      placeholder="Search"
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field kind="group">
                  <Form.Control>
                    <Button
                      style={{ boxShadow: "0px 0px 5px #888888" }}
                      color="link"
                      onClick={handleTestEmbeddings}
                      loading={loadingTest}
                    >
                      Test Embedding Score
                    </Button>
                  </Form.Control>
                </Form.Field>
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
              </Section>
            </Box>
          </Section>
          <Section style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Heading size={3}>Settings</Heading>
            <Box shadowless>
              <Form.Field>
                <Form.Control>
                  <Form.Checkbox
                    checked={settingsData.enableEmbedding}
                    onChange={(e) =>
                      updateSettingsFields("enableEmbedding", e.target.checked)
                    }
                  >
                    Enable Embeddings
                  </Form.Checkbox>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Minimum Score</Form.Label>
                <Form.Control>
                  <Form.Input
                    type="number"
                    onChange={(e) =>
                      updateSettingsFields("minimumScore", e.target.value)
                    }
                    placeholder="90"
                    value={settingsData.minimumScore}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field kind="group">
                <Form.Control>
                  <Button
                    color="link"
                    onClick={handleSaveSettings}
                    loading={loadingSave}
                  >
                    Save
                  </Button>
                </Form.Control>
              </Form.Field>
            </Box>
          </Section>
        </Box>

        <FooterSection />
      </AdminPage>
    </Hero>
  );
}

export default Manage;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { NavigationBar } from "../../components/NavigationBar";
import {
  Columns,
  Container,
  Heading,
  Hero,
  Block,
  Section,
} from "react-bulma-components";
import Chat from "../../components/chat";
import { useParams, useNavigate } from "react-router-dom";
import { FooterSection } from "../../components/Footer";
import image from "../../media/image.png";
import { BeatLoader } from "react-spinners";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

export interface DocumentUpload {
  input: string;
  solution?: string;
  title?: string;
  uploadDate: string;
  embedding: [Number];
  score?: number;
}

interface TestInterface {
  _id: string;
  input: string;
  title: string;
  score: number;
  solution?: string;
}

function App() {
  const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [document, setDocument] = useState<DocumentUpload | null>(null);
  const urlparam = useParams();
  const strurlparam = JSON.stringify(urlparam.id);
  const [loadingTest, setLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [urlQuery, setUrlQuery] = useState("");
  let navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();
  const account = localStorage.getItem("account") || "{}";

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

  // Handle collapsing of related topics
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const contentStyle = {
    display: collapsed ? "none" : "block",
  };

  // Retrieve document data
  const retrieveDocumentData = () => {
    setLoadingTest(true);
    fetch(`${endPoint}/findDocument?id=${urlparam.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
        setDocument(res as DocumentUpload);
      })
      .finally(() => {
        setLoadingTest(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (urlQuery) handleTestEmbeddings();
  }, [urlQuery]);

  useEffect(() => {
    retrieveDocumentData();
  }, [urlparam.id]);

  // Function to check if a string contains HTML
  const containsHTML = (str: string) => /<\/?[a-z][\s\S]*>/.test(str);

  // console.log(headingdata)
  useEffect(() => {
    // Set the URL query as a string
    const query = JSON.stringify(urlparam.query);
    setUrlQuery(query);
    console.log("query", query);
  }, []);

  const token = localStorage.getItem("token");

  const handleTestEmbeddings = () => {
    setLoadingTest(true);
    fetch(`${endPoint}/testEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        keyword: urlQuery,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTestResults(res.related);
        console.log(res.related);
      })
      .finally(() => {
        setLoadingTest(false);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Hero
        hasNavbar={true}
        size="fullheight"
        style={{
          flexGrow: 1,
        }}
      >
        <NavigationBar />
        <Hero.Body paddingless marginless>
          <Columns
            style={{
              marginTop: 150,
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "hidden",
            }}
          >
            <Columns.Column
              className="InfoBox"
              size="three-quarters"
              style={{
                display: "flex",
                flexDirection: "column",
                paddingInline: 0,
              }}
            >
              <Container
                style={{
                  paddingTop: 0,
                  minHeight: "100%",
                  marginInline: 0,
                }}
              >
                <Section
                  style={{
                    minHeight: "100%",
                    paddingTop: 0,
                  }}
                >
                  <Container>
                    {loadingTest ? (
                      // Loading spinner when data is loading
                      <>
                        <Block
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <BeatLoader color="#36d7b7" size={35} />
                        </Block>
                      </>
                    ) : null}
                    <Heading
                      className="titleBox"
                      style={{
                        padding: 20,
                        paddingTop: 0,
                        fontWeight: "bolder",
                      }}
                    >
                      {document?.title}
                    </Heading>

                    <Section
                      className="solutionsBox"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        paddingInline: "10%",
                        backgroundColor: "white",
                        textAlign: "justify",
                        borderRadius: 9,
                        boxShadow: "0px 0px 5px #888888",
                      }}
                    >
                      {document?.solution && containsHTML(document.solution) ? (
                        // Render HTML content safely
                        <div
                          dangerouslySetInnerHTML={{
                            __html: document?.solution,
                          }}
                        />
                      ) : (
                        // Render plain text
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {document?.solution}
                        </p>
                      )}
                    </Section>
                  </Container>
                </Section>
              </Container>
            </Columns.Column>

            <Columns.Column>
              <Section
                className="Related Topics"
                size="one-quarter"
                style={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "spacely-evenly",
                  backgroundColor: "white",
                  alignItems: "center",
                  borderRadius: 9,
                  boxShadow: "0px 0px 5px #888888",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Block
                    className="relatedTopics"
                    style={{
                      backgroundColor: "#002D72",
                      color: "white",
                      cursor: "pointer",
                      padding: 5,
                      fontWeight: "bolder",
                      fontSize: 30,
                      textAlign: "center",
                      borderRadius: 6,
                      boxShadow: "0px 0px 5px #888888",
                    }}
                    // Click handler for collapsing related topics
                    onClick={toggleCollapse}
                  >
                    RELATED TOPICS
                  </Block>
                  {testResults &&
                    testResults.map((res) => {
                      if (document?.title != res.title) {
                        return (
                          <Container
                            className="relatedTopicsTitle"
                            style={contentStyle}
                          >
                            <Block
                              style={{
                                cursor: "pointer",
                                margin: 10,
                              }}
                              // Click handler to navigate to a related topic's details
                              onClick={() => {
                                const cleanURL = urlQuery.replace(/"/g, "");
                                navigate(
                                  "/view-solution/" + res._id + "/" + cleanURL
                                );
                              }}
                            >
                              {res.title}
                            </Block>
                          </Container>
                        );
                      }
                    })}
                </div>
              </Section>
            </Columns.Column>
          </Columns>
        </Hero.Body>
        <FooterSection />
      </Hero>
    </div>
  );
}
export default App;

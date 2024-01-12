import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { NavigationBar } from "../../components/NavigationBar";
import {
  Card,
  Columns,
  Container,
  Content,
  Footer,
  Heading,
  Hero,
  Media,
  Form,
  Table,
  Button,
  Block,
  Section,
} from "react-bulma-components";
import Chat from "../../components/chat";
import { Ticket } from "../../components/Ticket";
import { FooterSection } from "../../components/Footer";
import Manage from "../manage";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import image from "../../media/image.png";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
  useIsAuthenticated,
  useMsal,
  useAccount,
} from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { handleSendTokenToBackend } from "../../components/dbFunctions/sendTokentoBE";

function App() {
  // Check if the user is authenticated
  const isAuthenticated = useIsAuthenticated();

  // Define the TestInterface for clarity
  interface TestInterface {
    _id: string;
    input: string;
    title: string;
    score: number;
    solution?: string;
  }

  let navigate = useNavigate();

  // Define the API endpoint, defaulting to 'http://localhost:8000' if not provided
  const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // State variables for managing loading, form visibility, test results, and document
  const [loadingTest, setLoadingTest] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [document, setDocument] = useState("");

  // Get authentication details and initialize the Microsoft Authentication Library
  const { instance, inProgress } = useMsal();
  const account = localStorage.getItem("account") || "{}";

  // Get user account based on the stored account data
  const userAccount = useAccount(JSON.parse(account));

  const handleTestEmbeddings = () => {
    // Set loading state to indicate an operation is in progress
    setLoadingTest(true);

    // Perform a POST request to the 'testEmbedding' endpoint using the fetch API
    fetch(`${endPoint}/testEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: document,
      }),
    })
      .then((res) => {
        // Handle the response from the server
        return res.json();
      })
      .then((res) => {
        // Set the test results and log the related data
        setTestResults(res.related);
        console.log(res.related);
      })
      .finally(() => {
        setLoadingTest(false);
      });
  };

  return (
    <>
      {showTicketForm && (
        // Render the Ticket component when showTicketForm is true
        <Ticket setShowTicketForm={setShowTicketForm} />
      )}
      <div
        style={{
          backgroundImage: `url(${image})`,
          height: "auto",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          margin: 0,
        }}
      >
        <NavigationBar />
        <Hero size="fullheight">
          <Hero.Body
            style={{
              paddingTop: 100,
            }}
          >
            <Container>
              <Form.Field kind="addons">
                <Form.Control fullwidth>
                  <Form.Input
                    onChange={(e) => setDocument(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === `Enter`)
                        // Execute handleTestEmbeddings on Enter key press
                        handleTestEmbeddings();
                    }}
                    value={document}
                    placeholder={"Search "}
                    style={{
                      boxShadow: "2px 2px 5px 0px #888888",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderRight: "none",
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize: "none",
                      marginTop: -50,
                    }}
                  />
                </Form.Control>
                <Form.Control>
                  <Button
                    onClick={() => {
                      // Clear the document and test results
                      setDocument("");
                      setTestResults([]);
                    }}
                    style={{
                      boxShadow: "2px 2px 5px 0px #888888",
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: "none",
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize: "none",
                      marginTop: -50,
                    }}
                  >
                    Clear
                  </Button>
                </Form.Control>
              </Form.Field>

              <Form.Field
                style={{
                  paddingInline: 100,
                }}
              >
                {loadingTest ? (
                  // Display a loading spinner when loadingTest is true
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
              </Form.Field>

              <section>
                <Columns
                  style={{
                    paddingTop: 20,
                  }}
                >
                  {/* Map through the test results and render each one */}
                  {testResults && testResults.map((res) => {
                    return (
                      <Columns.Column
                        key={res._id}
                        className="is-one-third"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Card
                          style={{
                            maxWidth: "70%",
                            minWidth: "100%",
                            margin: 10,
                            minHeight: "100%",
                          }}
                          onClick={() => {
                            // Navigate to view solution page with relevant information
                            navigate(
                              "view-solution/" + res._id + "/" + document
                            );
                          }}
                        >
                          <Card.Content>
                            <Media>
                              <Media.Item>
                                <Heading size={4}>{res.title}</Heading>
                              </Media.Item>
                            </Media>
                            <Content>{res.input}</Content>
                          </Card.Content>
                        </Card>
                      </Columns.Column>
                    );
                  })}

                  <Columns.Column
                    className="is-one-third"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      onClick={() => {
                        // Render a card for submitting a ticket
                        setShowTicketForm(true);
                      }}
                      style={{
                        width: "100%",
                        margin: 10,
                        minHeight: "100%",
                        backgroundColor: "#307FE2",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Content>
                        <Media>
                          <Media.Item>
                            <Heading
                              size={4}
                              style={{
                                color: "white",
                              }}
                            >
                              Submit Ticket
                            </Heading>
                          </Media.Item>
                        </Media>
                        <Content
                          style={{
                            color: "white",
                          }}
                        >
                          Can't find what you're looking for? Submit a ticket!
                        </Content>
                      </Card.Content>
                    </Card>
                  </Columns.Column>
                </Columns>
              </section>
            </Container>
          </Hero.Body>
          <Chat width={350} />
          <Hero.Footer marginless paddingless>
            <FooterSection />
          </Hero.Footer>
        </Hero>
      </div>
    </>
  );
}

export default App;

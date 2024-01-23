import { NavigationBar } from "../../components/NavigationBar";
import { SearchContainer } from "./searchContainer";
import { CategoriesContainer } from "./categoriesContainer";
import { BsArrowDownCircle } from "react-icons/bs";
import {
  Box,
  Button,
  Card,
  Columns,
  Container,
  Content,
  Footer,
  Form,
  Heading,
  Hero,
  Media,
  Modal,
} from "react-bulma-components";
import { FooterSection } from "../../components/Footer";
import "./homepage.css";
// import { articles } from './sampleArticles'
import {
  Category,
  Embedding,
  FetchCategories,
  FetchEmebeddingbyCategory,
} from "../../components/dbFunctions/fetchCategories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTestEmbeddings } from "../../components/dbFunctions/searchEmbeddings";
import AdminComponent from "../../components/AdminComponent";
import { Ticket } from "../../components/Ticket";


export const Homepage = () => {
  // State variables
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [collapsedCategory, setCollapsedCategory] = useState<string | null>(
    null
  );
  const [document, setDocument] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const [articles, setArticles] = useState<Array<Embedding>>([]);
  const [catarticles, setCatarticles] = useState<Array<Embedding>>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCategoryTitle, setEditedCategoryTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to toggle collapse
  const toggleCollapse = (categoryLabel: string) => {
    setCollapsedCategory((prevCollapsedCategory) =>
      prevCollapsedCategory === categoryLabel ? null : categoryLabel
    );
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (editMode) handleCancelEdit()
  };

  // Function to handle category title edit
  const handleEditCategory = (category: Category) => {
    setEditedCategoryTitle(category.label);
    setSelectedCategoryId(category._id);
    setEditMode(true);
  };

  // Function to handle category title save
  const handleSaveCategoryTitle = () => {
    // Perform the necessary action to save the edited category title
    // For example, you can implement an API call to update the category title in the database
    console.log(`Editing category title: ${editedCategoryTitle}`);
    // Reset the state variables
    setEditedCategoryTitle("");
    setSelectedCategoryId(null);
    setEditMode(false);
  };

  const handleSaveNewCategory = async () => {
    try {
      // Perform the necessary action to save the new category
      // For example, you can implement an API call to add the category to the database
      // Replace the following line with your actual save new category logic
      const response = await fetch(`/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({ title: newCategoryTitle }),
      });

      if (response.ok) {
        console.log(`New category "${newCategoryTitle}" saved successfully.`);
        // Fetch updated categories after saving
        FetchCategories().then((updatedCategories) => {
          if (updatedCategories) {
            setCategories(updatedCategories);
          }
        });
        // Reset the new category title and close the modal
        setNewCategoryTitle("");
        setAddCategory(false);
      } else {
        console.error(`Failed to save new category "${newCategoryTitle}"`);
      }
    } catch (error) {
      console.error('Error saving new category:', error);
    }
  };


  // Function to handle category title deletion
  const handleDeleteCategoryTitle = async (categoryId: string) => {
    try {
      // Perform the necessary action to delete the category title
      // For example, you can implement an API call to delete the category title from the database
      // Replace the following line with your actual delete category title logic
      const response = await fetch(`/api/categories/${categoryId}/title`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
      });

      if (response.ok) {
        console.log(`Category title with ID ${categoryId} deleted successfully.`);
        // Fetch updated categories after deletion
        FetchCategories().then((updatedCategories) => {
          if (updatedCategories) {
            setCategories(updatedCategories);
          }
        });
      } else {
        console.error(`Failed to delete category title with ID ${categoryId}`);
      }
    } catch (error) {
      console.error('Error deleting category title:', error);
    }
  };


  // Fetch categories on component mount
  useEffect(() => {
    FetchCategories().then((categories) => {
      if (categories) {
        setCategories(categories);
      }
    });
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    const result = await handleTestEmbeddings(document);
    if (result) {
      setArticles(result.related);
    }
  };

  // Handle category selection
  const handleCategory = async (id: string) => {
    FetchEmebeddingbyCategory(id).then((articles) => {
      if (articles) {
        setCatarticles(articles);
      }
    });
  };

  const handleCancelEdit = () => {
    setEditedCategoryTitle("");
    setSelectedCategoryId(null);
    setEditMode(false);
  };

  return (
    <>
      {showTicketForm && <Ticket setShowTicketForm={setShowTicketForm} />}

      <Hero size="fullheight">
        <NavigationBar />

        <Hero.Body
          style={{
            paddingInline: "28px",
            paddingBlock: "60px 28px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            className="left-side"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Container
              style={{
                width: "100%",
                flex: 1,
              }}
            >
              <Form.Field
                style={{
                  display: "flex",
                }}
              >
                <Form.Control
                  style={{
                    display: "flex",
                    flex: "1",
                  }}
                >
                  <Form.Input
                    placeholder="Search"
                    onChange={(e) => setDocument(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === `Enter`) handleSearch();
                    }}
                    style={{
                      borderRadius: "50px 0 0 50px",
                      border: "1px solid #307FE2",
                      borderRight: "none",
                      height: "60px",
                      width: "100%",
                    }}
                  />
                </Form.Control>
                <Form.Control>
                  <Button
                    onClick={() => {
                      setDocument("");
                      setArticles([]);
                    }}
                    style={{
                      backgroundColor: "#3080e236",
                      borderRadius: "0 50px 50px 0",
                      border: "1px solid #307FE2",
                      color: "#307FE2",
                      height: "60px",
                    }}
                  >
                    Clear
                  </Button>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label
                  style={{
                    fontWeight: "400",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "5px",
                  }}
                >
                  Most searched result:
                </Form.Label>
              </Form.Field>

              <Columns
                style={{
                  marginTop: "15px",
                  height: "40%",
                  flex: 1,
                }}
              >
                {articles.map((item) => (
                  <Columns.Column
                    className="is-one-third"
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Card
                      style={{
                        width: "100%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 5px #888888",
                        borderRadius: "10px",
                        padding: "15px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <section>
                        <Heading
                          style={{
                            marginBottom: "15px",
                          }}
                        >
                          {item.title}
                        </Heading>
                        <Content
                          style={{
                            height: "47%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            flex: 1,
                            marginBottom: "15px",
                          }}
                        ></Content>
                      </section>

                      <section>
                        <Button
                          onClick={() => {
                            navigate(
                              "view-solution/" + item._id + "/software"
                            );
                          }}
                          style={{
                            backgroundColor: "#3080e236",
                            borderRadius: "25px",
                            border: "1px solid #307FE2",
                            color: "#307FE2",
                            fontWeight: "600",
                            position: "relative",
                            marginBottom: "15px",
                          }}
                        >
                          View article
                        </Button>
                      </section>
                    </Card>
                  </Columns.Column>
                ))}
                <Columns.Column
                  className="is-one-third"
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card
                    style={{
                      width: "100%",
                      backgroundColor: "#307FE2",
                      borderRadius: "10px",
                      boxShadow: "0 0 5px #888888",
                      cursor: "pointer",
                      padding: "15px",
                      flex: 1,
                    }}
                    onClick={() => {
                      setShowTicketForm(true);
                    }}
                  >
                    <Heading
                      size={4}
                      style={{
                        color: "white",
                      }}
                    >
                      Submit Ticket
                    </Heading>
                    <Content
                      style={{
                        color: "white",
                      }}
                    >
                      Can't find what you're looking for? Submit a ticket!
                    </Content>
                  </Card>
                </Columns.Column>
              </Columns>
            </Container>
          </div>

          {/* Right side content */}
          <div
            className="right-side"
            style={{
              backgroundColor: "",
            }}
          >
            {/* Categories section */}
            <div
              style={{
                margin: "0",
                fontWeight: "500",
              }}
            >
              Categories:
            </div>

            {/* Admin section */}
            <section
              style={{
                marginTop: "10px",
              }}
            >
              <AdminComponent>
                {/* Add category button */}
                <Button
                  size={"small"}
                  style={{
                    backgroundColor: "#d9ead3",
                    fontWeight: "500",
                    border: "1px solid #47bd13",
                    color: "#47bd13",
                  }}
                  onClick={() => setAddCategory(true)}
                >
                  + Add a category
                </Button>

                {/* Add Category modal */}
                <Modal show={addCategory} onClose={() => setAddCategory(false)}>
                  <Modal.Card>
                    <Modal.Card.Header showClose>
                      <Modal.Card.Title>Add Category</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                      <Form.Field>
                        <Form.Control>
                          <Form.Input
                            placeholder="New Category Title"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                            style={{
                              borderRadius: "10px",
                              border: "1px solid #307FE2",
                              height: "30px",
                              width: "100%",
                            }}
                          />
                        </Form.Control>
                      </Form.Field>
                    </Modal.Card.Body>
                    <Modal.Card.Footer>
                      <Button
                        size={"small"}
                        style={{
                          backgroundColor: "#3080e236",
                          fontWeight: "500",
                          border: "1px solid #307FE2",
                          color: "#307FE2",
                        }}
                        onClick={handleSaveNewCategory}
                      >
                        Save
                      </Button>
                    </Modal.Card.Footer>
                  </Modal.Card>
                </Modal>
                {/* Edit button */}
                <Button
                  size={"small"}
                  style={{
                    backgroundColor: editMode ? "#d9534f" : "#3080e236",
                    fontWeight: "500",
                    border: "1px solid #307FE2",
                    color: "#307FE2",
                  }}
                  onClick={toggleEditMode}
                >
                  {editMode ? "Cancel Edit Mode" : "Edit Mode"}

                </Button>
              </AdminComponent>
            </section>

            {/* Categories list */}
            <section
              className="scrollbar-hide"
              style={{
                marginTop: "10px",
                maxHeight: "73vh",
                overflowY: "auto",
              }}
            >
              {/* Display categories */}
              {categories.map((category) => (
                <Card
                  key={category.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    padding: "10px",
                    marginBlock: "0 10px",
                    border: "1px solid #bcbcbc",
                    boxShadow: "none",
                  }}
                  onClick={() =>
                    editMode ? handleEditCategory(category) : handleCategory(category._id)
                  }
                >
                  {/* Editable Category Title */}
                  {editMode && selectedCategoryId === category._id ? (
                    <Form.Field>
                      <Form.Control>
                        <Form.Input
                          placeholder="Edit Category Title"
                          value={editedCategoryTitle}
                          onChange={(e) =>
                            setEditedCategoryTitle(e.target.value)
                          }
                          style={{
                            borderRadius: "10px",
                            border: "1px solid #307FE2",
                            height: "30px",
                            width: "100%",
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  ) : (
                    // Regular Category Heading
                    <Heading
                      onClick={() => {
                        toggleCollapse(category.label);
                      }}
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      {category.label}
                    </Heading>
                  )}

                  {/* Save/Edit buttons */}
                  {editMode && selectedCategoryId === category._id && (
                    <Form.Field>
                      <Form.Control>
                        <Button
                          size={"small"}
                          style={{
                            backgroundColor: "#3080e236",
                            fontWeight: "500",
                            border: "1px solid #307FE2",
                            color: "#307FE2",
                          }}
                          onClick={handleSaveCategoryTitle}
                        >
                          Save
                        </Button>
                        <Button
                          size={"small"}
                          style={{
                            backgroundColor: "#d9534f",
                            fontWeight: "500",
                            border: "1px solid #d9534f",
                            color: "#fff",
                          }}
                          onClick={() => handleDeleteCategoryTitle(selectedCategoryId!)}
                        >
                          Delete
                        </Button>
                      </Form.Control>
                    </Form.Field>
                  )}

                  {/* Display category articles */}
                  {catarticles.map((item) => (
                    <Content
                      onClick={() => {
                        navigate("view-solution/" + item._id + "/software");
                      }}
                      key={item.title}
                      style={{
                        fontWeight: "300",
                        fontSize: "16px",
                        margin: "0px",
                        cursor: "pointer",
                        display: editMode ? "none" : collapsedCategory === category.label ? "block" : "none",
                      }}
                    >
                      {item.title}
                    </Content>
                  ))}
                </Card>
              ))}
            </section>
          </div>
        </Hero.Body>

        {/* Hero Footer */}
        <Hero.Footer marginless paddingless>
          <FooterSection />
        </Hero.Footer>
      </Hero>
    </>
  );
};

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Content,
  Form,
  Heading,
  Modal,
} from "react-bulma-components";
import AdminComponent from "../../../components/AdminComponent";
import {
  Category,
  Embedding,
  FetchCategories,
  FetchCreateCategory,
  FetchDeleteCategory,
  FetchEmebeddingbyCategory,
} from "../../../components/dbFunctions/fetchCategories";
import { useNavigate } from "react-router-dom";

export const SideCatMenu = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCategoryTitle, setEditedCategoryTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [catarticles, setCatarticles] = useState<Array<Embedding>>([]);
  const [collapsedCategory, setCollapsedCategory] = useState<string | null>(
    null
  );
  const [categories, setCategories] = useState<Array<Category>>([]);

  // React Router navigation hook
  const navigate = useNavigate();
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (editMode) handleCancelEdit();
  };
  const handleCancelEdit = () => {
    setEditedCategoryTitle("");
    setSelectedCategoryId(null);
    setEditMode(false);
  };
  const handleEditCategory = (category: Category) => {
    setEditedCategoryTitle(category.label);
    setSelectedCategoryId(category._id);
    setEditMode(true);
  };
  // Handle category selection
  const handleCategory = async (id: string) => {
    FetchEmebeddingbyCategory(id).then((articles) => {
      if (articles) {
        setCatarticles(articles);
      }
    });
  };
  // Function to toggle collapse
  const toggleCollapse = (categoryLabel: string) => {
    setCollapsedCategory((prevCollapsedCategory) =>
      prevCollapsedCategory === categoryLabel ? null : categoryLabel
    );
  };
  // Function to handle category title deletion
  const handleDeleteCategoryTitle = async (categoryId: string) => {
    try {
      // Perform the necessary action to delete the category title
      // For example, you can implement an API call to delete the category title from the database
      // Replace the following line with your actual delete category title logic
      const response = await FetchDeleteCategory(categoryId);

      if (response) {
        console.log(
          `Category title with ID ${categoryId} deleted successfully.`
        );
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
      console.error("Error deleting category title:", error);
    }
  };
  const handleSaveNewCategory = async () => {
    try {
      // Perform the necessary action to save the new category
      // For example, you can implement an API call to add the category to the database
      // Replace the following line with your actual save new category logic
      const response = await FetchCreateCategory(newCategoryTitle);
      console.log(`New category "${newCategoryTitle}" saved successfully.`);
      // Fetch updated categories after saving
      if (!response) {
        return console.error(
          `Failed to save new category "${newCategoryTitle}"`
        );
      }
      FetchCategories().then((updatedCategories) => {
        if (updatedCategories) {
          setCategories(updatedCategories);
        }
      });
      // Reset the new category title and close the modal
      setNewCategoryTitle("");
      setAddCategory(false);
      console.log(response);
    } catch (error) {
      console.error("Error saving new category:", error);
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
  return (
    <>
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
                editMode
                  ? handleEditCategory(category)
                  : handleCategory(category._id)
              }
            >
              {/* Editable Category Title */}
              {editMode && selectedCategoryId === category._id ? (
                <Form.Field>
                  <Form.Control>
                    <Heading
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      {category.label}
                    </Heading>
                    {/* comment out to add edit categoryname */}
                    {/* <Form.Input
                      // placeholder="Edit Category Title"
                      value={category.label}
                      onChange={(e) =>
                        setEditedCategoryTitle(e.target.value)
                      }
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #307FE2",
                        height: "30px",
                        width: "100%",
                      }}
                    /> */}
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
                    {/* <Button
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
                    </Button> */}
                    <Button
                      size={"small"}
                      style={{
                        backgroundColor: "#d9534f",
                        fontWeight: "500",
                        border: "1px solid #d9534f",
                        color: "#fff",
                      }}
                      onClick={() =>
                        handleDeleteCategoryTitle(selectedCategoryId)
                      }
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
                    navigate(
                      "view-solution/" + item._id + "/" + category.label
                    );
                  }}
                  key={item.title}
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    margin: "0px",
                    cursor: "pointer",
                    display: editMode
                      ? "none"
                      : collapsedCategory === category.label
                      ? "block"
                      : "none",
                  }}
                >
                  {item.title}
                </Content>
              ))}
            </Card>
          ))}
        </section>
      </div>
    </>
  );
};

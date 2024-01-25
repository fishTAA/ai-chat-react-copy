import React, { useEffect, useState } from "react";
import { Heading, Notification } from "react-bulma-components";
import Select from "react-select";
import {
  Category,
  FetchCategories,
} from "../../../components/dbFunctions/fetchCategories";
const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

interface options {
  value: string;
  label: string;
}
export const CreateTab = () => {
  const [categories, setCategories] = useState<Array<Category>>();
  const [selectOption, setSelectOption] = useState<Array<options>>([]);
  const [documentCategory, setDocumentCategory] = useState<Array<options>>([]);
  const [embeddingNotification, setEmbeddingNotification] = useState<any>(
    <></>
  );
  const [createEmbeddingSuccess, setCreateEmbeddingSuccess] = useState(false);
  const [loadingEmbedding, setLoadingEmbedding] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentKeyword, setDocumentKeyword] = useState("");
  const [document, setDocument] = useState("");

  //used to change category array to be readable by select component
  const SetOptions = (categories: Category[] | undefined) => {
    if (categories) {
      const newoptions = categories.map((category: Category) => ({
        value: category._id,
        label: category.label,
      }));
      setSelectOption(newoptions);
    }
  };
  //fetch the categories array from db
  useEffect(() => {
    FetchCategories().then((categories) => {
      setCategories(categories);
      SetOptions(categories);
    });
  }, []);

  const handleCreateEmbeddings = () => {
    const token = localStorage.getItem("token");

    setCreateEmbeddingSuccess(false);
    setLoadingEmbedding(true);
    fetch(`${endPoint}/createEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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

  return (
    <div>
      <Heading size={3} style={{ marginTop: "20px" }}>
        New Embedding
      </Heading>
      {embeddingNotification}

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Title
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="input"
                type="text"
                placeholder="Enter Title"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Keywords
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g. mouse problem"
                onChange={(e) => setDocumentKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Categories
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <Select
                isMulti
                name="colors"
                options={selectOption}
                value={documentCategory}
                onChange={(selectedOptions: any) =>
                  setDocumentCategory(selectedOptions)
                }
                placeholder="Select a category"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{ marginRight: "20px" }}>
            Description / Solution
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Describe the solution"
                rows={8}
                onChange={(e) => setDocument(e.target.value)}
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
              <button
                onClick={handleCreateEmbeddings}
                className="button is-link"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

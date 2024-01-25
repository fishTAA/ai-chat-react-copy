import React, { useEffect, useState } from "react";
import { Heading } from "react-bulma-components";
import Select from "react-select";
import { FetchEmbeddingsCollection } from "../../../components/dbFunctions/fetchEmbeddings";
import { Category, Embedding, FetchCategories } from "../../../components/dbFunctions/fetchCategories";
interface Editprops {
  handleCloseEditModal: () => void;
  showEditModal: boolean;
  handleEditButtonClick: (title: string)  => void;
}
interface options {
  value: string;
  label: string;
}
export const EditTab: React.FC<Editprops> = ({
  handleCloseEditModal,
  showEditModal,
  handleEditButtonClick,
}) => {
  const [embeddings, setEmbeddings] = useState<Array<Embedding>>([]);
  const [thisEmbedding, setThisEmbedding] = useState<Embedding | undefined>();
  const [categories, setCategories] = useState<Array<Category>>();
  const [selectOption, setSelectOption] = useState<Array<options>>([]);
  const [documentCategory, setDocumentCategory] = useState<Array<options>>([]);

  useEffect(() => {
    FetchEmbeddingsCollection().then((e) => {
      if (e) {
        setEmbeddings(e);
      }
    });
  }, []);

  const handleEeditButtonClick = (embedding: Embedding) => {
    setThisEmbedding(embedding)
  if (embedding) {
    const foshoCategories: Array<options> = []
    handleEditButtonClick(embedding.title); // Assuming this function handles the modal display logic
    if(embedding.categories){
    embedding.categories.forEach((catid)=>{
      // console.log("Document has",catid, "Options are", selectOption)
      const filteredCategories = selectOption.filter((option) =>
        String(option.value) === (String(catid))
      )
      foshoCategories.push(...filteredCategories)
    })}
    setDocumentCategory(foshoCategories);
    // console.log("Now has",documentCategory)
  }
  }

   //used to change categories array to be readable by select component
   const SetOptions = (categories: Category[] | undefined) => {
    if (categories) {
      const newoptions = categories.map((categories: Category) => ({
        value: categories._id,
        label: categories.label,
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
  return (
    <div>
      <Heading size={3} style={{ marginTop: "20px" }}>
        Edit Embedding
      </Heading>

      <table className="table is-fullwidth">
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Action</th>
        </thead>
        <tbody>
          {embeddings &&
            embeddings.map((embedding,index) => (
              <tr key={embedding._id}>
                <td>{index+1}</td>
                <td>{embedding.title}</td>
                <td>
                  <button
                    className="button is-link is-focus"
                    style={{ marginRight: "5px" }}
                    onClick={
                      ()=>{
                      handleEeditButtonClick(embedding)}
                    }
                  >
                    Edit
                  </button>
                  <button className="button is-danger is-focus">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className={`modal ${showEditModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Embedding</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleCloseEditModal}
            ></button>
          </header>
          <section className="modal-card-body">
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
                      className="input"
                      type="text"
                      placeholder="Enter Title"
                      value={thisEmbedding?.title}
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
                      value={thisEmbedding?.input}
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
                      placeholder="Select a categories"
                      
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
                      value={thisEmbedding?.solution}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={handleCloseEditModal}
              style={{ marginRight: "5px" }}
            >
              Save changes
            </button>
            <button className="button" onClick={handleCloseEditModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

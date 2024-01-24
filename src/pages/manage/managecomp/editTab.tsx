import React from "react";
import { Heading } from "react-bulma-components";
import Select from "react-select";
interface Editprops {
  handleCloseEditModal: () => void;
  showEditModal: boolean;
  handleEditButtonClick: () => void;
}

export const EditTab: React.FC<Editprops> = ({
  handleCloseEditModal,
  showEditModal,
  handleEditButtonClick,
}) => {
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
          <tr>
            <td>1</td>
            <td>test</td>
            <td>
              <button
                className="button is-link is-focus"
                style={{ marginRight: "5px" }}
                onClick={handleEditButtonClick}
              >
                Edit
              </button>
              <button className="button is-danger is-focus">Delete</button>
            </td>
          </tr>
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
                      //   options={selectOption}
                      // value={documentCategory}
                      // onChange={(selectedOptions: any) =>
                      // setDocumentCategory(selectedOptions)
                      //   }
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

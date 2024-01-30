import React, { useEffect, useMemo, useState } from "react";
import { Block, Heading, Hero, Notification } from "react-bulma-components";
import Select from "react-select";
import {
  FetchDeleteEmbedding,
  FetchEmbeddingsCollection,
} from "../../../components/dbFunctions/fetchEmbeddings";
import {
  Category,
  Embedding,
  FetchCategories,
} from "../../../components/dbFunctions/fetchCategories";
import { PulseLoader } from "react-spinners";
import Pagination from "./pagination";

interface options {
  value: string;
  label: string;
}
const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const EditTab = () => {
  const [embeddings, setEmbeddings] = useState<Array<Embedding>>([]);
  const [thisEmbedding, setThisEmbedding] = useState<Embedding | undefined>();
  const [categories, setCategories] = useState<Array<Category>>();
  const [selectOption, setSelectOption] = useState<Array<options>>([]);
  const [documentCategory, setDocumentCategory] = useState<Array<options>>([]);
  const [onChangeTilte, setOnChangeTitle] = useState<string>();
  const [onChangeKeyword, setOnChangeKeyword] = useState<string>();
  const [onChangeSolution, setOnChangeSolution] = useState<string>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [CreateEmbeddingSuccess, setCreateEmbeddingSuccess] =
    useState<boolean>(false);
  const [LoadingEmbedding, setLoadingEmbedding] = useState<boolean>(false);
  const [embeddingNotification, setEmbeddingNotification] = useState<any>(
    <></>
  );
  const [loadingTest, setLoadingTest] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 6; // Set the number of items to display per page

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredEmbeddings = useMemo(() => {
    return embeddings.filter(embedding =>
      embedding.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, embeddings]);

  const paginatedEmbeddings = useMemo(() => {
    return filteredEmbeddings.slice(startIndex, endIndex);
  }, [currentPage, searchTerm, filteredEmbeddings, embeddings])

  const GetCollection = async () => {
    setLoadingTest(true);
    const e = await FetchEmbeddingsCollection();
    if (e) {
      setEmbeddings(e);
      setLoadingTest(false);
    }
  };
  useEffect(() => {
    GetCollection();
  }, []);

  const handleEeditButtonClick = (embedding: Embedding) => {
    setThisEmbedding(embedding);
    if (embedding) {
      const foshoCategories: Array<options> = [];
      if (embedding.categories) {
        embedding.categories.forEach((catid) => {
          // console.log("Document has",catid, "Options are", selectOption)
          const filteredCategories = selectOption.filter(
            (option) => String(option.value) === String(catid)
          );
          foshoCategories.push(...filteredCategories);
        });
      }
      setDocumentCategory(foshoCategories);
      // console.log("Now has",documentCategory)
    }
    setShowEditModal(true);
  };

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
  useEffect(() => {
    setOnChangeTitle(thisEmbedding?.title);
    setOnChangeKeyword(thisEmbedding?.input);
    setOnChangeSolution(thisEmbedding?.solution);
  }, [thisEmbedding]);

  const handleCloseEditModal = () => {
    setThisEmbedding(undefined);
    setOnChangeTitle("");
    setOnChangeKeyword("");
    setOnChangeSolution("");
    setDocumentCategory([]);
    setShowEditModal(false);
  };
  const HandleUpdateEmbeddings = () => {
    const token = localStorage.getItem("token");
    console.log("click at update");
    setCreateEmbeddingSuccess(false);
    setLoadingEmbedding(true);
    fetch(`${endPoint}/updateEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: onChangeTilte,
        keyword: onChangeKeyword,
        input: onChangeSolution,
        categories: documentCategory.map((option) => option.value),
        findID: thisEmbedding?._id,
      }),
    })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        setEmbeddingNotification(
          <Notification color="success">Embedding Created</Notification>
        );
        setCreateEmbeddingSuccess(true);
      })
      .finally(() => {
        handleCloseEditModal();
        setLoadingEmbedding(false);
        GetCollection();
      });
  };

  const HandleEmbeddingDelete = async (embedding: Embedding) => {
    await FetchDeleteEmbedding(embedding._id)
      .then((e) => window.alert("Deleted Succesfully"))
      .then((e) => GetCollection())
      .catch((e) => window.alert(e));
  };


  return (
    <div>
      <Heading size={3} style={{ marginTop: "20px" }}>
        Edit Embedding
      </Heading>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>ID</th>
            <th style={{ width: "200px" }}>Title</th>
            <th style={{ width: "150px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loadingTest ? (
            // Display a loading spinner when loadingTest is true
            <tr>
              <td colSpan={3}>
                <div className="container is-widescreen has-text-centered" style={{ margin: '125px' }}>
                  <PulseLoader color="#274d88" size={10} />
                </div>
              </td>
            </tr>
          ) : (
            paginatedEmbeddings && paginatedEmbeddings.map((embedding, index) => (
              <tr key={embedding._id}>
                <td style={{ width: "50px" }}>{startIndex + index + 1}</td>
                <td style={{ width: "200px" }}>{embedding.title}</td>
                <td style={{ width: "150px" }}>
                  <button
                    className="button is-link is-focus"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      handleEeditButtonClick(embedding);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button is-danger is-focus"
                    onClick={() => {
                      HandleEmbeddingDelete(embedding);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmbeddings.length / ITEMS_PER_PAGE)}
        onPageChange={onPageChange}
        maxVisiblePages={3}
      />

      <div className={`modal ${showEditModal ? "is-active" : ""} on`}>
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
                      onChange={(e) => {
                        setOnChangeTitle(e.target.value);
                      }}
                      className="input"
                      type="text"
                      placeholder="Enter Title"
                      value={onChangeTilte}
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
                      onChange={(e) => {
                        setOnChangeKeyword(e.target.value);
                      }}
                      className="input"
                      type="text"
                      placeholder="e.g. mouse problem"
                      value={onChangeKeyword}
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
                      onChange={(e) => {
                        setOnChangeSolution(e.target.value);
                      }}
                      className="textarea"
                      placeholder="Describe the solution"
                      rows={8}
                      value={onChangeSolution}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={HandleUpdateEmbeddings}
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

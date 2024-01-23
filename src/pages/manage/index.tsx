import React, { useState } from "react";
import { MdOutlineAddBox, MdOutlineEdit } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { GrDocumentTest } from "react-icons/gr";
import { NavigationBar } from "../../components/NavigationBar";
import { Form, Heading, Hero } from "react-bulma-components";
import Select from "react-select";


function Manage() {
    const [activeTab, setActiveTab] = useState("create");
    const [isEmbeddingEnabled, setIsEmbeddingEnabled] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleTabClick = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const handleCheckboxChange = () => {
        setIsEmbeddingEnabled(!isEmbeddingEnabled);
    };

    const handleEditButtonClick = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <>
            <Hero>
                <Hero.Header><NavigationBar /></Hero.Header>
                <Hero.Body>
                    <Heading size={3} style={{ marginTop: '30px' }}>Embeddings</Heading>
                    <div className="tabs is-boxed">
                        <ul>
                            <li className={activeTab === "create" ? "is-active" : ""}>
                                <a onClick={() => handleTabClick("create")}>
                                    <span className="icon is-small" style={{ marginRight: '10px' }}>
                                        <MdOutlineAddBox />
                                    </span>
                                    <span>Create</span>
                                </a>
                            </li>
                            <li className={activeTab === "edit" ? "is-active" : ""}>
                                <a onClick={() => handleTabClick("edit")}>
                                    <span className="icon is-small" style={{ marginRight: '10px' }}>
                                        <MdOutlineEdit />
                                    </span>
                                    <span>Edit</span>
                                </a>
                            </li>
                            <li className={activeTab === "test" ? "is-active" : ""}>
                                <a onClick={() => handleTabClick("test")}>
                                    <span className="icon is-small" style={{ marginRight: '10px' }}>
                                        <GrDocumentTest />
                                    </span>
                                    <span>Test</span>
                                </a>
                            </li>
                            <li className={activeTab === "settings" ? "is-active" : ""}>
                                <a onClick={() => handleTabClick("settings")}>
                                    <span className="icon is-small" style={{ marginRight: '10px' }}>
                                        <TbSettings />
                                    </span>
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Add content for the selected tab */}
                    {activeTab === "create" &&
                        <div>
                            <Heading size={3} style={{ marginTop: '20px' }}>New Embedding</Heading>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label" style={{ marginRight: '20px' }}>Title</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Enter Title" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label" style={{ marginRight: '20px' }}>Keywords</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="e.g. mouse problem" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label" style={{ marginRight: '20px' }}>Categories</label>
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
                                    <label className="label" style={{ marginRight: '20px' }}>Description / Solution</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <textarea className="textarea" placeholder="Describe the solution" rows={8}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label">
                                    {/* Left empty for spacing */}
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-link">
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {activeTab === "edit" &&
                        <div>
                            <Heading size={3} style={{ marginTop: '20px' }}>Edit Embedding</Heading>

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
                                            <button className="button is-link is-focus" 
                                                style={{ marginRight: '5px' }}
                                                onClick={handleEditButtonClick}
                                            >
                                                Edit
                                            </button>
                                            <button className="button is-danger is-focus">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={`modal ${showEditModal ? 'is-active' : ''}`}>
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title">Edit Embedding</p>
                                        <button className="delete" aria-label="close" onClick={handleCloseEditModal}></button>
                                    </header>
                                    <section className="modal-card-body">
                                        <div className="field is-horizontal">
                                            <div className="field-label is-normal">
                                                <label className="label" style={{ marginRight: '20px' }}>Title</label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Enter Title" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field is-horizontal">
                                            <div className="field-label is-normal">
                                                <label className="label" style={{ marginRight: '20px' }}>Keywords</label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="e.g. mouse problem" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field is-horizontal">
                                            <div className="field-label is-normal">
                                                <label className="label" style={{ marginRight: '20px' }}>Categories</label>
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
                                                <label className="label" style={{ marginRight: '20px' }}>Description / Solution</label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <div className="control">
                                                        <textarea className="textarea" placeholder="Describe the solution" rows={8}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <footer className="modal-card-foot">
                                        <button className="button is-success" 
                                            onClick={handleCloseEditModal} 
                                            style={{ marginRight: '5px' }}
                                        >
                                            Save changes
                                        </button>
                                        <button className="button" onClick={handleCloseEditModal}>Cancel</button>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    }
                    {activeTab === "test" &&
                        <div>
                            <Heading size={3} style={{ marginTop: '20px' }}>Test Embedding</Heading>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label" style={{ marginRight: '20px' }}>Search</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <textarea className="textarea" placeholder="Write something here ..." rows={3}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label">
                                    {/* Left empty for spacing */}
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-link">
                                                Test
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {activeTab === "settings" &&
                        <div>
                            <Heading size={3} style={{ marginTop: '20px' }}>Settings</Heading>

                            {/* <label className="checkbox">
                                <input type="checkbox" style={{ marginRight: '20px' }} />
                                Enable embedding
                            </label> */}

                            <div className="field is-horizontal">
                                <div className="field-label">
                                    <label className="label" style={{ marginRight: '20px' }} >Enable Embedding</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <label className="checkbox">
                                                <input type="checkbox" style={{ marginRight: '10px' }}
                                                    checked={isEmbeddingEnabled}
                                                    onChange={handleCheckboxChange}
                                                />
                                                {isEmbeddingEnabled ? "Enabled" : "Disabled"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label" style={{ marginRight: '20px' }} >Minimum Score</label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control">
                                            <input className="input" type="number" placeholder="score" min={0} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label">
                                    {/* Left empty for spacing */}
                                </div>
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-link">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Hero.Body>
            </Hero>

        </>
    );
}

export default Manage;

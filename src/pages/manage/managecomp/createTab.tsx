import React from "react";
import { Heading } from "react-bulma-components";
import Select from "react-select";


export const CreateTab=()=>{
    return(
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
    )
}
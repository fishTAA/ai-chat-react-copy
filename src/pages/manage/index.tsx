import React, { useState } from "react";
import { MdOutlineAddBox, MdOutlineEdit } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { GrDocumentTest } from "react-icons/gr";
import { NavigationBar } from "../../components/NavigationBar";
import { Form, Heading, Hero } from "react-bulma-components";
import Select from "react-select";
import { CreateTab } from "./managecomp/createTab";
import { EditTab } from "./managecomp/editTab";
import { TestTab } from "./managecomp/testTab";
import { SettingsTab } from "./managecomp/settingsTab";

function Manage() {
  const [activeTab, setActiveTab] = useState("edit");
  const [isEmbeddingEnabled, setIsEmbeddingEnabled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = () => {
    setIsEmbeddingEnabled(!isEmbeddingEnabled);
  };

 
  return (
    <>
      <Hero>
        <Hero.Header>
          <NavigationBar />
        </Hero.Header>
        <Hero.Body>
          <Heading size={3} style={{ marginTop: "30px" }}>
            Embeddings
          </Heading>
          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === "create" ? "is-active" : ""}>
                <a onClick={() => handleTabClick("create")}>
                  <span
                    className="icon is-small"
                    style={{ marginRight: "10px" }}
                  >
                    <MdOutlineAddBox />
                  </span>
                  <span>Create</span>
                </a>
              </li>
              <li className={activeTab === "edit" ? "is-active" : ""}>
                <a onClick={() => handleTabClick("edit")}>
                  <span
                    className="icon is-small"
                    style={{ marginRight: "10px" }}
                  >
                    <MdOutlineEdit />
                  </span>
                  <span>Edit</span>
                </a>
              </li>
              <li className={activeTab === "test" ? "is-active" : ""}>
                <a onClick={() => handleTabClick("test")}>
                  <span
                    className="icon is-small"
                    style={{ marginRight: "10px" }}
                  >
                    <GrDocumentTest />
                  </span>
                  <span>Test</span>
                </a>
              </li>
              <li className={activeTab === "settings" ? "is-active" : ""}>
                <a onClick={() => handleTabClick("settings")}>
                  <span
                    className="icon is-small"
                    style={{ marginRight: "10px" }}
                  >
                    <TbSettings />
                  </span>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
          {/* Add content for the selected tab */}
          {activeTab === "create" && <CreateTab />}
          {activeTab === "edit" && <EditTab />}
          {activeTab === "test" && <TestTab />}
          {activeTab === "settings" && (
            <SettingsTab
              handleCheckboxChange={handleCheckboxChange}
              isEmbeddingEnabled={isEmbeddingEnabled}
            />
          )}
        </Hero.Body>
      </Hero>
    </>
  );
}

export default Manage;

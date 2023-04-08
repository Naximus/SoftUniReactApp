import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../api/config";
import { AppTokenContext } from "../../../contexts/AppTokenContext";
import { TrainerContext } from "../../../contexts/TrainerContext";

const TrainerProfileInfo = ({userRole}) => {
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);
    // Error set
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(undefined);

    const [editedInfo, setEditedInfo] = useState(currentTrainer);
  
    const [isEditingPhone, setIsPhoneEditing] = useState(false);
    const [isEditingEmail, setIsEmailEditing] = useState(false);
    const [isEditingTarget, setIsTargetEditing] = useState(false);
    const [isEditingNotes, setIsNotesEditing] = useState(false);
    const [isEditingRegime, setIsRegimeEditing] = useState(false);

    const [editedFields, setEditedFields] = useState([]);
    const [isChaned, setIsChanged] = useState(false);

    const clientId = currentTrainer._id;

    // const handleEdit = (key, value) => {
    //   setEditedInfo({
    //     ...editedInfo,
    //     [key]: value
    //   });
    //   setEditedFields((prevFields) => [...prevFields, key]);
    // };
  
    const handleInputChange = (event) => {
      setIsChanged(true);
      const { name, value } = event.target;
      setEditedInfo({
        ...editedInfo,
        [name]: value
      });
      // setEditedFields((prevFields) => [...prevFields, name]);
      setEditedFields([name]);
    };
  
    const handleSave = async () => {
      // Send only edited fields to the backend
      // if (isChaned) {
      const editedData = {};
      editedFields.forEach((field) => {
        editedData[field] = editedInfo[field];
      });

        const [changedProperty, propertyValue] = Object.entries(editedData)[0];

        const reqProperty = changedProperty == "foodRegime" ? "food-regime" : changedProperty;

      await fetch(`${BASE_URL}/trainers/${clientId}/${reqProperty}`, {
        method: "PUT",
        headers: { "content-type": "application/json", "X-Authorization" :  appToken},
        mode: "cors",
        body: JSON.stringify({
            [changedProperty]: propertyValue,
        }),
      })
        .then(async (response) => {
          const res = await response.json()
          if (!response.ok) {
            const err = res.error
            throw new Error(err);
          }
          else {
            // console.log(res, editedInfo);
            console.log(changedProperty, propertyValue);
            setCurrentTrenier(editedInfo);
            setEditedInfo(editedInfo);

            setIsPhoneEditing(false);
            setIsEmailEditing(false);
            setIsTargetEditing(false);
            setIsNotesEditing(false);
            setIsRegimeEditing(false);

            
            return res;
          }
        })
        .catch((error) => {
          setCurrentTrenier(currentTrainer)
          setError(error.message);
          setShowError(true);

          // Hide error after 3 seconds
          setTimeout(() => {
            setShowError(false);
            setError(undefined)
          }, 3000);
        });






      // Update the current client with edited info
      // setEditedInfo(editedInfo);
      
    // }
    // setIsPhoneEditing(false);
    // setIsEmailEditing(false);
    // setIsTargetEditing(false);
    // setIsNotesEditing(false);
    // setIsRegimeEditing(false);
    };
  
    const handleCancel = () => {
      setEditedInfo(currentTrainer);
      setEditedFields([]);
      setIsPhoneEditing(false);
      setIsEmailEditing(false);
      setIsTargetEditing(false);
      setIsNotesEditing(false);
      setIsRegimeEditing(false);
    };


    const dateStr = currentTrainer.created;
    const date = dateStr.substring(0, 10);
  
    return (
      <>
        <ul className="main-box">
        {error ? <div className="error">{error}</div> : null}
        {["admin", "trainer", "manager"].includes(userRole) &&
              <li>
              <div className="icon-phone inline-icons"></div>
              {!isEditingPhone ? (
                <div className="info-icons-holder">
                  {editedInfo.phone}
                  <div className="row-icons icon-edit p-div-margin" onClick={() => setIsPhoneEditing(true)}></div>
                </div>
              ) : (
                <div className="edit-icons-input-holder">
                  <input type="text" name="phone" value={editedInfo.phone || ""} onChange={handleInputChange} />
                  <div className="row-icons icon-save"  onClick={handleSave}></div>
                  <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                </div>
              )}
            </li>
            }
      
          {["admin", "trainer", "manager"].includes(userRole) &&
                        <li>
                        <div className="icon-email inline-icons"></div>
                        {!isEditingEmail ? (
                          <div className="info-icons-holder">
                            {editedInfo.email}
                            <div className="row-icons icon-edit p-div-margin" onClick={() => setIsEmailEditing(true)}></div>
                          </div>
                        ) : (
                          <div className="edit-icons-input-holder">
                            <input type="text" name="email" value={editedInfo.email || ""} onChange={handleInputChange} />
                            <div className="row-icons icon-save"  onClick={handleSave}></div>
                            <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                          </div>
                        )}
                      </li>
                      }
         
          <li>
            <div className="icon-calendar-add  inline-icons"></div>
            <div className="info-icons-holder">{date}</div>
          </li>
        </ul>

      <div className="main-box client-target">
            <h3>ЦЕЛ</h3>
            {!isEditingTarget ? (
              <div>
                {editedInfo.target}

                {["admin","manager"].includes(userRole) &&
                        <div className="row-icons icon-edit p-div-margin" onClick={() => setIsTargetEditing(true)}></div>
                      }

              </div>
            ) : (
              <>
                <textarea  className="text-holder" type="text" name="target" rows="12" cols="50" value={editedInfo.target || ""} onChange={ handleInputChange } />
                <div className="change-button-holder">
                  <div className="row-icons icon-save"  onClick={handleSave}></div>
                  <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                </div>
              </>
            )}
        </div>
        {["admin", "trainer", "manager"].includes(userRole) &&
                        <div className="main-box client-target">
                        <h3>БЕЛЕЖКИ</h3>
                        {!isEditingNotes ? (
                          <div>
                            {editedInfo.notes}
                            <div className="row-icons icon-edit p-div-margin"  onClick={() => setIsNotesEditing(true)}></div>
                          </div>
                        ) : (
                          <div>
                            <textarea  className="text-holder" type="text" name="notes" rows="12" cols="50"  value={editedInfo.notes || ""} onChange={handleInputChange} />
                            <div className="change-button-holder">
                              <div className="row-icons icon-save" onClick={handleSave}></div>
                              <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                            </div>
                          </div>
                        )}
                    </div>
                      }

      <div className="main-box client-target">
            <h3>ЗА МЕН</h3>
            {!isEditingRegime ? (
              <div>
                {editedInfo.foodRegime}

                {["trainer"].includes(userRole) &&
                        <div className="row-icons icon-edit p-div-margin" onClick={() => setIsRegimeEditing(true)}></div>
                      }

              </div>
            ) : (
              <div>
                <textarea  className="text-holder" type="text" name="foodRegime" rows="12" cols="50"  value={editedInfo.foodRegime || ""} onChange={handleInputChange} />
                <div className="change-button-holder">
                  <div className="row-icons icon-save" onClick={handleSave}></div>
                  <div className="row-icons icon-close-ring" onClick={handleCancel}></div>
                </div>
              </div>
            )}
        </div>
    </>
  );
};

export default TrainerProfileInfo;

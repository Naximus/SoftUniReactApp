import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../contexts/ClientContext";
import { BASE_URL } from "../../../api/config";
import { AppTokenContext } from "../../../contexts/AppTokenContext";

const ClientProfileInfo = () => {
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const { currentClient, setCurrentClient } = useContext(ClientContext);
    const [error, setError] = useState(undefined);

    const [editedInfo, setEditedInfo] = useState(currentClient);
  
    const [isEditingPhone, setIsPhoneEditing] = useState(false);
    const [isEditingEmail, setIsEmailEditing] = useState(false);
    const [isEditingTarget, setIsTargetEditing] = useState(false);
    const [isEditingNotes, setIsNotesEditing] = useState(false);
    const [isEditingRegime, setIsRegimeEditing] = useState(false);

    const [editedFields, setEditedFields] = useState([]);
    

    const clientId = currentClient._id;

    const handleEdit = (key, value) => {
      setEditedInfo({
        ...editedInfo,
        [key]: value
      });
      setEditedFields((prevFields) => [...prevFields, key]);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedInfo({
        ...editedInfo,
        [name]: value
      });
      setEditedFields((prevFields) => [...prevFields, name]);
    };
  
    const handleSave = async () => {
      console.log(editedInfo);
      // Send only edited fields to the backend
      const editedData = {};
      editedFields.forEach((field) => {
        editedData[field] = editedInfo[field];
      });

        const [changedProperty, propertyValue] = Object.entries(editedData)[0];
        console.log(changedProperty, propertyValue);


      await fetch(`${BASE_URL}/clients/${clientId}/${changedProperty}`, {
        method: "PUT",
        headers: { "content-type": "application/json", "X-Authorization" :  appToken},
        mode: "cors",
        body: JSON.stringify({
            [changedProperty]: propertyValue,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .catch((error) => {
          console.log("error: " + error);
          setError("User could not be authenticated");
        });






      console.log(editedData);
      // Update the current client with edited info
      setEditedInfo(editedInfo);
      setIsPhoneEditing(false);
      setIsEmailEditing(false);
      setIsTargetEditing(false);
      setIsNotesEditing(false);
      setIsRegimeEditing(false);
    };
  
    const handleCancel = () => {
      setEditedInfo(currentClient);
      setEditedFields([]);
      setIsPhoneEditing(false);
      setIsEmailEditing(false);
      setIsTargetEditing(false);
      setIsNotesEditing(false);
      setIsRegimeEditing(false);
    };
  
  
    const dateStr = currentClient.created;
    const date = dateStr.substring(0, 10);
  
    return (
      <>
        <ul className="main-box">
          <li>
            <div className="icon-phone inline-icons"></div>
            {!isEditingPhone ? (
              <p>
                {editedInfo.phone}
                <button onClick={() => setIsPhoneEditing(true)}>Edit</button>
              </p>
            ) : (
              <div>
                <input type="text" name="phone" value={editedInfo.phone || ""} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </li>
          <li>
            <div className="icon-email inline-icons"></div>
            {!isEditingEmail ? (
              <p>
                {editedInfo.email}
                <button onClick={() => setIsEmailEditing(true)}>Edit</button>
              </p>
            ) : (
              <div>
                <input type="text" name="email" value={editedInfo.email || ""} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </li>
          <li>
            <div className="icon-calendar-add  inline-icons"></div>
            <p>{date}</p>
          </li>
        </ul>

      <div className="main-box client-target">
            <h3>ЦЕЛ</h3>
            {!isEditingTarget ? (
              <p>
                {editedInfo.target}
                <button onClick={() => setIsTargetEditing(true)}>Edit</button>
              </p>
            ) : (
              <div>
                <input type="text" name="target" value={editedInfo.target || ""} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
        </div>

      <div className="main-box client-target">
            <h3>БЕЛЕЖКИ</h3>
            {!isEditingNotes ? (
              <p>
                {editedInfo.notes}
                <button onClick={() => setIsNotesEditing(true)}>Edit</button>
              </p>
            ) : (
              <div>
                <input type="text" name="notes" value={editedInfo.notes || ""} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
        </div>

      <div className="main-box client-target">
            <h3>ХРАНИТЕЛЕН РЕЖИМ</h3>
            {!isEditingRegime ? (
              <p>
                {editedInfo.foodRegime}
                <button onClick={() => setIsRegimeEditing(true)}>Edit</button>
              </p>
            ) : (
              <div>
                <input type="text" name="foodRegime" value={editedInfo.foodRegime || ""} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
        </div>
    </>
  );
};

export default ClientProfileInfo;

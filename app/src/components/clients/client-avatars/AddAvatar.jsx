import React, { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../../../api/config';
import { AppTokenContext } from '../../../contexts/AppTokenContext';
import { ClientContext } from '../../../contexts/ClientContext';


function AvatarPicker({
  clientAvatar,
  setClientAvatar,
  onClose }
    ) {

  const { appToken, setAppToken } = useContext(AppTokenContext);
  const { currentClient, setCurrentClient } = useContext(ClientContext);
  const [error, setError] = useState(undefined);


  const [selectedAvatar, setSelectedAvatar] = useState(clientAvatar);
  const prevClientAvatar = useRef(clientAvatar);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

    //   Avatar picker 
    
    const avatars = [
        "https://drive.google.com/uc?export=view&id=1-iyuyLkBLQdUjEiXC76u0yFA_Y3-QmRe",
        "https://drive.google.com/uc?export=view&id=1rP6PbPVUoCzw-vylZSYIf7zwxJC4kFdn",
        "https://drive.google.com/uc?export=view&id=1ysX69PS4WoYDPoVU-PBHwjKGcny6TlxR",
    ];

    const clientId = currentClient._id;
    const onSaveAvatar = async () => {
            if (prevClientAvatar.current !== selectedAvatar) {
                console.log("VAV FETCHA pravi zaqvka");
                // fetch data here
                await fetch(`${BASE_URL}/clients/${clientId}/image`, {
                method: "PUT",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
                body: JSON.stringify({
                  image: selectedAvatar,
                }),
              })
                .then((response) => {
                  if (!response.ok) throw new Error(response.status);
                  else {
                    prevClientAvatar.current = clientAvatar;
                    setClientAvatar(selectedAvatar);
                    return response.json();
                  }
                })
                .catch((error) => {
                  console.log("error: " + error);
                  setError("User could not be authenticated");
                });
              
            }
            
    }

  return (
    <>
    <div className='create-card-overlay'>
        <div className='avatar-images'>
        {avatars.map((avatar, index) => (
            <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleAvatarClick(avatar)}
            style={{
                width: '200px',
                height: '200px',
                border: selectedAvatar === avatar ? '2px solid blue' : 'none',
            }}
            />
        ))}
        </div>
        <div>
        {selectedAvatar && (
            <div className='avatar-picked-image'>
                <img src={selectedAvatar} alt="Selected Avatar" />
                <button className='btn-only-text-outline-small' 
                onClick={() => { onClose(); onSaveAvatar()}} >
                            Запази </button>
            </div>
        )}
        </div>
    </div>
    </>
  );
}

export default AvatarPicker;
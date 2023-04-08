import React, { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../../../api/config';
import { AppTokenContext } from '../../../contexts/AppTokenContext';
import { ClientContext } from '../../../contexts/ClientContext';
import { TrainerContext } from '../../../contexts/TrainerContext';


function AvatarPicker({
  clientAvatar,
  setClientAvatar,
  onClose }
    ) {

  const { appToken, setAppToken } = useContext(AppTokenContext);
  const { currentClient, setCurrentUser } = useContext(ClientContext);
  const { currentTrainer, setCurrentTrenier  } = useContext(TrainerContext);
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
        "https://drive.google.com/uc?export=view&id=13LOP1gk7ANBoXa49J-Wox3BdZbWkad-q",
        "https://drive.google.com/uc?export=view&id=1gzo-y5fLZdcjwKAekIDdG2uGJLPzEMo0",
        "https://drive.google.com/uc?export=view&id=1E1gw58Qi6ymg7GWTnZFORjVLnDqkbeCZ",
        "https://drive.google.com/uc?export=view&id=1jVp_Au625RFwDgQZYCFm-ifGR0E9TYIz",
        "https://drive.google.com/uc?export=view&id=1BAA4493InYssdV5nNfEz0TgLHY41g0FD",
    ];

    
    const clientId = currentClient ? currentClient._id  : currentTrainer._id;
    const reqPath =  currentClient ? "clients"  : "trainers";

    const onSaveAvatar = async () => {
            if (prevClientAvatar.current !== selectedAvatar) {
                // fetch data here
                await fetch(`${BASE_URL}/${reqPath}/${clientId}/image`, {
                method: "PUT",
                headers: { "content-type": "application/json", "X-Authorization" :  appToken},
                mode: "cors",
                body: JSON.stringify({
                  image: selectedAvatar,
                }),
              })
                .then(async (response) => {
                  const res = await response.json()
                  if (!response.ok) {
                    const err = res.error;
                    throw new Error(err);
                  }
                  else {
                    prevClientAvatar.current = clientAvatar;
                    setClientAvatar(selectedAvatar);
                    if (res.type === "trainer") {
                      setCurrentTrenier(res);
                    } else if  (res.type === "client"){
                      setCurrentUser(res);
                    }
                    return res;
                  }
                })
                .catch((error) => {
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
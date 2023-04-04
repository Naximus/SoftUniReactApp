import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrainerContext } from "../../../contexts/TrainerContext";



const SingleTrainer = ({
    trainer
}) => {
    console.log(trainer);
    const {currentTrainer, setCurrentTrenier} = useContext(TrainerContext)
    const navigate = useNavigate();

    
   
    const onClickUser = () => {
            setCurrentTrenier(trainer)
            console.log(trainer._id);
            navigate(`/trainers/${trainer._id}`);
        
    }

    return (
            <div className="client-holder">
                
                    <div className="name-img-holder">
                        <img src={trainer.image} alt="avatar" />
                        <h1>{trainer.name}</h1>
                    </div>
            
                <button className="btn-only-text-outline-small" onClick={onClickUser}>Details</button>
            </div>
        
    )
}

export default SingleTrainer;
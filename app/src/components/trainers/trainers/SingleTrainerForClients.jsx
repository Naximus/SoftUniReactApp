import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrainerContext } from "../../../contexts/TrainerContext";



const SingleTrainerForClients = ({
    trainer
}) => {
    console.log(trainer);
    const {currentTrainer, setCurrentTrenier} = useContext(TrainerContext)


    return (
            <div className="trainers-holder">
                
                    <div className="name-img-holder">
                        <img src={trainer.image} alt="avatar" />
                        <h1>{trainer.name}</h1>
                    </div>
                    <div className="trainers-phone">
                        <div className="icon-phone inline-icons"></div>
                        <p>
                            {trainer.phone}
                        </p>
                    </div>
                    <div className="trainers-phone">
                    <div className="icon-email inline-icons"></div>
                    <p>
                        {trainer.email}
                        </p>
                    </div>
                    <div>
                    <p>{trainer.foodRegime}</p>
                    </div>
            </div>
        
    )
}

export default SingleTrainerForClients;
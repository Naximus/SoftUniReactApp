import { useEffect, useState } from "react";

export const SubscriptionCards = ({
    type,
    start,
    end,
    trainingsLeft,
    paid,
    active,
    trainings
}) => {
    
    const isPaid  = paid;
    const paidClass = isPaid ? 'paid-card' : 'unpaid-card';

        
        // To set two dates to two variables
        let curentDate = new Date();
        let endDate = new Date(end);
        
        // To calculate the time difference of two dates
        let Difference_In_Time = endDate.getTime() - curentDate.getTime();
        
        // To calculate the no. of days between two dates
        let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    

    return (
        <div className={`client-card ${type}`}>
            <div className="card-top-part">
                <div className="card-logo alfa-logo-no-text "></div>
                <h3 className="card-type">{type}</h3>
                <div className={`card-circle ${paidClass}`}></div>
            </div>
            <div className="card-middle-part">
                <div className="days-let">
                    <h4>Оставащи<br/>дни</h4>
                    <h4>{Difference_In_Days}</h4>
                </div>
                <div className="training-left">
                <h4>Оставащи<br/>тренировки</h4>
                    <h4>{trainingsLeft}</h4>
                </div>
            </div>
            <div className="client-visits">
                <h3>Посещени</h3>
                <div className= 'data-mini'>
                {/* {trainings.date.map((item) => (
                    <div key={item} >
                        <p>{item}</p>
                    </div>
                ))} */}
                {trainings.length === 0 && (
                <h3 >Няма посещения</h3>
            )}
                </div>
            </div>
        </div>
    )
}
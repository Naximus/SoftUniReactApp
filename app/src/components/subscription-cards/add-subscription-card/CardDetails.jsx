import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppTokenContext } from '../../../contexts/AppTokenContext';
import { CreateCardConext } from '../../../contexts/CreatCardContex';
import Login from '../../../pages/login/Login';


export const CardDetails = (
    {card,
    onDeleteCart,
    onSaveLocal
}
) => {

    const { appToken, setAppToken } = useContext(AppTokenContext);
    const {onSaveCard, clientCreator, clientId, setAddCard} = useContext(CreateCardConext);

    const [selectedDate, setSelectedDate] = useState(card.start);
    const [selectedEndDate, setSelectedEndDate] = useState(card.end);


    const isPaid  = card.paid;
    const paidClass = isPaid ? 'paid-card' : 'unpaid-card';
    const [paidStatus, setPaidStatus] = useState(paidClass);

    const changePaidStatus = () => {
        setPaidStatus(prevStatus => prevStatus === 'paid-card' ? 'unpaid-card' : 'paid-card');
    }
    const onSave = (e) => {
        // const paid = setPaidStatus === 'paid-card' ? false : true;
        const paid = paidStatus === 'paid-card' ? true : false;

        const newCard = {
            type: card.type,
            start: selectedDate,
            end: selectedEndDate,
            trainingsLeft: card.trainingsLeft,
            paid: paid,
            owner: clientId,
        }
        onSaveCard(newCard);
    }
    
    return (
        <>
        <div className='create-card-overlay'>
            <div className={`client-card center-client-card ${card.type}`}>
                <div className="card-top-part">
                    <div className="card-logo alfa-logo-no-text "></div>
                    <h3 className="card-type">{card.type}</h3>
                    <div className={`card-circle ${paidStatus}`} onClick = {changePaidStatus}>

                    </div>
                </div>
                <div className="card-middle-part">
                    <div>
                        <h4>Начална<br/>дата</h4>
                        <DatePicker
                            showIcon
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                    <h4>Крайна<br/>дата</h4>
                        <DatePicker
                            showIcon
                            selected={selectedEndDate}
                            onChange={date => setSelectedEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                <div className='card-btn'> 
                    <div className='row-icons icon-save' onClick={() => {
                        onSave();
                        onSaveLocal();
                        }} ></div>
                    <div className='row-icons icon-trash' onClick={() => onDeleteCart()}></div>
                </div>
            </div>
        </div>
        </>
    )
}
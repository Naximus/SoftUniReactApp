import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import { AppTokenContext } from '../../../contexts/AppTokenContext';
import { CreateCardConext } from '../../../contexts/CreatCardContex';
import Login from '../../../pages/login/Login';


export const EditSubscriptionCard = (
    {cartData,
        onClose } 
) => {
   


    const { appToken, setAppToken } = useContext(AppTokenContext);
    const {onUpdateCard, deleteSelectedCard, clientId} = useContext(CreateCardConext);

    const [error, setError] = useState(undefined);
    const [showError, setShowError] = useState(false);

    const startDate = parseISO(cartData.start);
    const endDate = parseISO(cartData.end);

    const [selectedDate, setSelectedDate] = useState(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(endDate);


    const isPaid  = cartData.paid;
    
    const paidClass = isPaid ? 'paid-card' : 'unpaid-card';
    const [paidStatus, setPaidStatus] = useState(paidClass);

    const changePaidStatus = () => {
        setPaidStatus(prevStatus => prevStatus === 'paid-card' ? 'unpaid-card' : 'paid-card');
    }
    const onSave = (e) => {
        // const paid = setPaidStatus === 'paid-card' ? false : true;
        const paid = paidStatus === 'paid-card' ? true : false;
        if(selectedDate < selectedEndDate) { 
            const updatedCard = {
                _id: cartData._id,
                start: selectedDate,
                end: selectedEndDate,
                trainingsLeft: cartData.trainingsLeft,
                paid: paid
            }
            const _id = cartData._id;
            onUpdateCard(_id, updatedCard);
            handleCardClose();
         } else {
            setError('Невалидна дата');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError(undefined);
            }, 5000);
         }
        
    }
       
    const handleCardClose = () => {
        onClose();
    }
    return (
        <>
        <div className='create-card-overlay'>
            <div className={`client-card center-client-card ${cartData.type}`}>
                <div className="card-top-part">
                    <div className="card-logo alfa-logo-no-text "></div>
                    <h3 className="card-type">{cartData.type}</h3>
                    <div className={`card-circle ${paidStatus}`} onClick = {changePaidStatus}>

                    </div>
                </div>
                {error ? <div className="error">{error}</div> : null}
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
                    <div className='row-icons icon-close-ring' onClick={handleCardClose} ></div>
                    <div className='row-icons icon-save' onClick={() => {
                        onSave();
                        // handleCardClose();
                        }} ></div>
                    <div className='row-icons icon-trash' onClick={() => {
                        deleteSelectedCard(cartData._id);
                        handleCardClose();
                        }}></div>
                </div>
            </div>
        </div>
        </>
    )
}
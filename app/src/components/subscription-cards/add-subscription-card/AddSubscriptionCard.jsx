import React, { useState, useEffect, useContext } from 'react';
import { AppTokenContext } from '../../../contexts/AppTokenContext';
import { CreateCardConext } from '../../../contexts/CreatCardContex';
import { CardDetails } from './CardDetails';

export const AddSubscriptionCard = () => {
    const { appToken, setAppToken } = useContext(AppTokenContext);
    const {onSaveCard, clientCreator, clientId, setAddCard} = useContext(CreateCardConext);

    const [selectedCard, setSelectedCard] = useState(null);
    // Set and calculate date
    const [currentDay, setCurrentDay] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    const [futureDay, setFutureDay] = useState('');
    const [futureMonth, setFutureMonth] = useState('');
    const [futureYear, setFutureYear] = useState('');

    const newDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(newDate.getDate() + 35); // Add 5 weeks (35 days) to the current date

    useEffect(() => {
        setCurrentDay(newDate.getDate());
            setCurrentMonth(newDate.getMonth() + 1);
            setCurrentYear(newDate.getFullYear());

            setFutureDay(futureDate.getDate());
            setFutureMonth(futureDate.getMonth() + 1);
            setFutureYear(futureDate.getFullYear());

      }, []);

    
    //   ------------------------------------

    // Presets type of cards
    const personalTen = { 
        "type" : "personal-card", 
        "start" : newDate, 
        "end" : futureDate, 
        "trainingsLeft" : "10", 
        "paid" : "true", 
        "trainer" : "641234d6f1af71f9f50c9ece" 
    }
    const groupTen = { 
        "type" : "group-card", 
        "start" : newDate, 
        "end" : futureDate, 
        "trainingsLeft" : "10", 
        "paid" : "true", 
        "trainer" : "641234d6f1af71f9f50c9ece" 
    }

    const onChoseCard = (e) => {
        // console.log(e.target.id);
        if (e.target.id === 'personalTen') {
            
            console.log(personalTen);
            setSelectedCard(personalTen);
        } else if (e.target.id === 'groupTen') {
            setSelectedCard(groupTen);
        }
        
    }
 
      const onDeleteCart = () => {
        setSelectedCard(null);
        setAddCard(false)
      }
      const onSaveLocal = () => {
        setSelectedCard(null);
        setAddCard(false)
      }
    
    return(
        <>
        {/* { selectedCard && <CardDetails card={selectedCard} onDeleteCart = {onDeleteCart} onSaveCard = {onSaveCard} appToken={appToken} clientId={clientId} onSaveLocal={onSaveLocal}/>} */}
        { selectedCard && <CardDetails card={selectedCard} onDeleteCart = {onDeleteCart} onSaveLocal={onSaveLocal}/>}
            <div className='client-cards-holder'>
                <h1>Избери карта</h1>
                <div id='personalTen'  className='choose-card personal-card' onClick={onChoseCard}>
                    <div id='personalTen' className='row-icons  icon-user-white'></div>
                    <h2 id='personalTen'>ПЕРСОНАЛНА 10</h2>
                    <div id='personalTen' className='row-icons icon-add-ring'></div>
                </div>
                <div id='groupTen' className='choose-card group-card' onClick={onChoseCard}>
                    <div id='groupTen' className='row-icons  icon-user-white'></div>
                    <h2 id='groupTen'>ГРУПОВА 10</h2>
                    <div id='groupTen' className='row-icons icon-add-ring'></div>
                </div>
            </div>

        </>
    )
}
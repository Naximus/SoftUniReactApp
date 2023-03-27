import { useEffect, useState } from "react";

export const EditClient = ({data}) => {
    const [values, setValues] = useState({
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone
    });

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }


    return (
            <form id="create" onSubmit={ onSubmit }>
                <div className="client-profile mobile-pages">
                     <h1>Промяна на информацията</h1>
                    <div className="client-profile-info">
                        <div className="input-holder">
                            <label htmlFor="clientName" className="icon-user-white row-icons"></label>
                            <input value = {values.name} onChange = {onChangeHandler} type="text" id="name" name="name" placeholder="Име на клиента"/>
                        </div>

                        <div className="input-holder">
                            <label htmlFor="clientEmail" className="icon-email row-icons"></label>
                            <input value = {values.email} onChange = {onChangeHandler} type="email" id="email" name="email" placeholder="Email"/>
                        </div>
                        
                        <div className="input-holder">
                            <label htmlFor="ClienUsername" className="icon-user-cicrle-white row-icons"></label>
                            <input value = {values.username} onChange = {onChangeHandler} type="text" id="username" name="username" placeholder="Псевдоним, добави ако няма email"/>
                        </div>
                        
                        <div className="input-holder">
                            <label htmlFor="ClienPhone" className="icon-lock-white row-icons"></label>
                            <input value = {values.phone} onChange = {onChangeHandler} type="number" id="phone" name="phone" />
                        </div>
                    </div>

                    <button type="submit" className="btn-only-text-outline-small">Запази</button>
                </div>
                
            </form>
    )
}
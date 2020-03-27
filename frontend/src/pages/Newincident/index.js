import React, { useState } from 'react';
import logoImg from './../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import './style.css'
import api from '../../services/api';

export default function Newincident(){


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId')


    async function handleStorNewIncident(e){
        e.preventDefault()


        const data = {
            title,
            description,
            value
        }


        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                },
                
            })

            history.push('/profile')
        } catch (e){
            alert("Não foi possivel gravar o novo incidente")
        }
    
    }


    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="be the hero"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#E02041"/>
                Voltar para Home
                </Link>


            </section>

            <form onSubmit={handleStorNewIncident}> 
                <input 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Titulo do caso"/>
                <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                 placeholder="Descrição do caso"/>

                <input 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Valor em reais"/>
                  

                <button  className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}
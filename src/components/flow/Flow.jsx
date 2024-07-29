/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Close from './themes/close.png';
import './Flow.css';
import { botSVGs, humanSVGs } from './Svg';
import Theme from './Theme';
import Response from './Response';
import axios from 'axios';
import showToasts from '../../pages/Toast';
import { useNavigate } from 'react-router';

function Flow({userData}) {

    const navigate = useNavigate();

    const botOptions = ['Text', 'Image', 'Video', 'Gif'];

    const humanInputs = ['Text', 'Number', 'Email', 'Phone', 'Date', 'Rating', 'Buttons'];

    const [formName, setFormName] = useState('');

    const [redirect, setRedirect] = useState({
        flow: true,
        theme: false,
        response: false
    });

    const getFormId = localStorage.getItem('formId') || ''

    const [finalFlow, setFinalFlow] = useState([])

    const addToFinalFlow = (option) => {
        const newItem = {
            stepType: option.name,
            contentType: option.text.toLowerCase(),
            value: '',
            inputType: option.name === 'human' ? option.text.toLowerCase() : ''
        };
        setFinalFlow(prevFlow => [...prevFlow, newItem]);
    };

    const handleInputChange = (index, newValue) => {
        setFinalFlow(prevFlow => {
            const newFlow = [...prevFlow];
            newFlow[index] = {...newFlow[index], value: newValue}
            return newFlow;
        })
    }

    useEffect(() => {
        if(getFormId) {
            getFormData();
        }
    }, [])

    const getFormData = async () => {
        try {
           const response = await axios.get(`http://localhost:5000/get-flow/${getFormId}`);
           if(response.data.status === 'Success') {
             console.log(response.data.data)
             setFormName(response.data.data.name);
             setFinalFlow(response.data.data.steps);
           }
        } catch (error) {
            showToasts('Error in fetching data', 'error');
            console.log(error)
        }
    }


    const shareFormBot = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/update-flow/${getFormId}`, {
                name: formName,
                steps: finalFlow
               })
            if(response.data.status === 'Success') {
                showToasts(response.data.message, 'success');
                setRedirect({...redirect, flow: false, theme: true, response: false})
            }
        } catch (error) {
            showToasts('Error in saving/updating', 'error');
            console.log(error)
        }
    }


    const saveFormData = async () => {
        try {
           const response = await axios.post('http://localhost:5000/create-flow', {
            name: formName,
            steps: finalFlow, // Remove svgs before sending
            creatorId: userData._id,
            folderId: localStorage.getItem('folderId') || ''
           })
           if(response.data.status === 'Success') {
            showToasts('Form saved successfully', 'success');
            setRedirect({...redirect, flow: false, theme: true, response: false});
           } else {
            showToasts(response.data.message, 'error');
           }
        } catch (error) {
            console.log(error);
            showToasts('Error saving form', 'error');
        }
    }
   


    const handleAction = () => {
        if (formName || finalFlow.length > 0) {
            shareFormBot();
        } else {
            saveFormData();
        }
    };


    if (!userData) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white' }}>Please log in first to access your workspace.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    console.log(finalFlow)

    if(!finalFlow) {

    }



    return (
        <div style={{ backgroundColor: '#1F1F23',color: '#fff'}}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.16)' }}>
                <div className='work-header'>
                    <div>
                        <input type='text' placeholder=' Enter form name' value={formName} onChange={(e) => setFormName(e.target.value)}/>
                    </div>

                    <div className='work-header-1'>
                        <div onClick={() => setRedirect({...redirect, flow: true, theme: false, response: false})} className={redirect.flow ? 'work-header-item-1': ''}>
                            Flow
                        </div>

                        <div onClick={() => setRedirect({...redirect, flow: false, theme: true, response: false})} className={redirect.theme ? 'work-header-item-1': ''}>
                            Theme
                        </div>

                        <div onClick={() => setRedirect({...redirect, flow: false, theme: false, response: true})} className={redirect.response ? 'work-header-item-1': ''}>
                            Response
                        </div>
                    </div>


                    <div className='work-header-2'>
                        <div className='work-header-2-1' >
                            Share
                        </div>

                        <div className='work-header-2-2' onClick={handleAction}>
                            Save
                        </div>

                        <div>
                            <img src={Close} alt='' />
                        </div>
                    </div>
                </div>
            </div>

            {redirect.flow && <div style={{ backgroundColor: '#1F1F23', height: '100vh', display: 'flex'}}>
                <div className='workspace-sidebar'>
                    <div className='Bot-bar'>
                        <div>
                            Bubbles
                        </div>

                        <div className='bot-options'>
                            {botOptions.map((ele, ind) => (
                                <div key={ind} className='bot-options-item' style={{ marginRight: '0.3em' }} onClick={() => addToFinalFlow({ name: 'bot', text: ele, svgs: botSVGs[ind], value: '' })}>
                                    <div style={{ background: 'transparent', margin: '0em 0.5em' }}>
                                        <p style={{ background: 'transparent' }}>
                                            {botSVGs[ind]}
                                        </p>
                                    </div>
                                    <div style={{ background: 'transparent' }}>
                                        {ele}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='Bot-bar'>
                            <div>
                                Inputs
                            </div>
                            <div className='bot-options'>
                                {humanInputs.map((ele, ind) => (
                                    <div key={ind} className='bot-options-item' style={{ marginRight: '0.3em' }}  onClick={() => addToFinalFlow({ name: 'human', text: ele, svgs: humanSVGs[ind], value: '' })}>
                                        <div style={{ background: 'transparent', margin: '0em 0.5em' }}>
                                            <p style={{ background: 'transparent' }}>
                                                {humanSVGs[ind]}
                                            </p>
                                        </div>
                                        <div style={{ background: 'transparent' }}>
                                            {ele}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                    <div style={{margin: '0 auto'}}>
                        <div className='start-items-1'>
                            <div style={{ marginRight: '0.4em'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <path d="M0 0V21H2.625V0H0ZM5.25 0V10.5H10.5V13.125H21L15.75 7.95375L21 2.625H13.125V0L5.25 0Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                Start
                            </div>

                        </div>
                        <div className='flow-items'>
                            {finalFlow.map((ele, ind) => (
                            <div className='flow-items-1'>
                                <div style={{marginBottom: '0.5em'}}>
                                    {finalFlow[ind].contentType}
                                </div>

                                <div>
                                    <div style={{borderRadius: '5px', border: finalFlow[ind].name==='bot' ? '1px solid #F55050' :  '', display: 'flex', backgroundColor: finalFlow[ind].name==='bot' ? '#1F1F23' : '', padding: '0.4em', marginBottom: '0.4em'}}>
                                        {finalFlow[ind].stepType === 'bot' && (<div>{finalFlow[ind].svgs}</div>)}
                                        {finalFlow[ind].stepType === 'bot' ? (<input style={{backgroundColor: '#1F1F23', border: 'none', outline: 'none', color: '#fff', caretColor:'#fff',}} type='text' placeholder=' Click here to edit' value={finalFlow[ind].value} onChange={(e) => handleInputChange(ind, e.target.value)}/>) : (
                                            <p style={{color: '#555555', fontSize: '0.8em'}}>Hint : User will input a {finalFlow[ind].text} on his form</p>
                                        )}
                                    </div>
                                    {finalFlow[ind].stepType === 'bot' &&  <p style={{color: '#522224', margin: '0em', fontSize: '0.8em'}}>Required field</p>}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

            </div>}


            {redirect.theme && <Theme />}

            {redirect.response && <Response />}
        </div>
    )
}

export default Flow
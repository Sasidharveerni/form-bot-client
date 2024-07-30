import React, { useEffect, useState } from 'react';
import FormBotLogo from '../components/flow/themes/image 4.png';
import axios from 'axios';

function FormBot() {

  const flowId = localStorage.getItem('formId');
  console.log(flowId)
  const [flowData, setFlowData] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedSteps, setDisplayedSteps] = useState([]);

  useEffect(() => {
    const getFormId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-flow/${flowId}`);
        if (response.data.status === 'Success') {
          setFlowData(response.data.data.steps);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFormId();
  }, [flowId]);

  useEffect(() => {
    if (flowData && flowData[currentStepIndex]?.stepType === 'bot') {
      setDisplayedSteps(prev => [...prev, flowData[currentStepIndex]]);
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    }
  }, [currentStepIndex, flowData]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTyping(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the human response value in the backend
      const response = await axios.put(`http://localhost:5000/update-flow/${flowId}`, {
        name: flowData.name,
        steps: flowData.map((step, index) =>
          index === currentStepIndex && step.stepType === 'human' ? { ...step, value: userInput } : step
        )
      });

      // If the update is successful, proceed to update the displayed steps
      if (response.data.status === 'Success') {
        // Add current human step to displayed steps
        setDisplayedSteps(prev => [...prev, { ...flowData[currentStepIndex], value: userInput }]);

        // Move to the next step
        setCurrentStepIndex(prevIndex => prevIndex + 1);
        setUserInput('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  };


  const renderBotMessage = (step) => (
    <div className='formbot-flex'>
      <img height={30} width={30} src={FormBotLogo} alt='' style={{ marginRight: '0.5em' }} />
      {step.contentType === 'image' && <img width={200} height={200} src={step.value} alt='' className='bot-response' />}

      {step.contentType === 'gif' && <img src={step.value} alt='' className='bot-response' />}


      {step.contentType === 'text' && <p className='bot-response'>{step.value}</p>}

      {step.contentType === 'video' && <video controls>
        <source src={step.value} />
        Your browser does not support the video tag.
      </video>}
    </div>
  );

  const renderHumanInput = (step) => (
    <form onSubmit={handleSubmit} style={{float: 'right'}}>
      <div className='human-response' >

      {step.inputType === 'number' &&
      <input
       type='number'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
        required
      />}

{step.inputType === 'text' &&
      <input
       type='text'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
        required
      />}

{step.inputType === 'date' &&
      <input
       type='date'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
        required
      />}

   {step.inputType === 'phone' &&
      <input
       type='text'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
        required
      />}

{step.inputType === 'email' &&
      <input
       type='email'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
        required
      />}

{step.inputType === 'rating' &&
      <input
       type='number'
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
      />}

      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 26" fill="none">
          <path d="M0.75 25.6666V0.333313L30.8333 13L0.75 25.6666ZM3.91667 20.9166L22.6792 13L3.91667 5.08331V10.625L13.4167 13L3.91667 15.375V20.9166Z" fill="white" />
        </svg>
      </button>
      </div>

    </form>
  );

  const currentStep = flowData ? flowData[currentStepIndex] : null;

  return (
    <div>
      {displayedSteps.map((step, index) => (
        <div key={index} className='formbot-response'>
          {step.stepType === 'bot' ? renderBotMessage(step) : (
            <div className='human-response'>
              <p style={{backgroundColor: '#777777'}} className='input-bar'>{step.value}</p>
              <button style={{backgroundColor: '#777777'}} disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 31 26" fill="none">
                  <path d="M0.75 25.6666V0.333313L30.8333 13L0.75 25.6666ZM3.91667 20.9166L22.6792 13L3.91667 5.08331V10.625L13.4167 13L3.91667 15.375V20.9166Z" fill="white" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}

      {currentStep && currentStep.stepType === 'human' && !isTyping && renderHumanInput(currentStep)}

      {isTyping && (
        <div className='formbot-flex'>
          <img height={30} width={30} src={FormBotLogo} alt='' style={{ marginRight: '0.5em' }} />
          <div className='typing-indicator'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormBot;

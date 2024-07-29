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
      <p className='bot-response'>{step.value}</p>
    </div>
  );

  const renderHumanInput = (step) => (
    <form className='human-response' onSubmit={handleSubmit}>
      <input
        type={step.inputType === 'number' ? 'number' : 'text'}
        placeholder='Enter your response'
        className='input-bar'
        value={userInput}
        onChange={handleInputChange}
      />
      <button type='submit'>Send</button>
    </form>
  );

  const currentStep = flowData ? flowData[currentStepIndex] : null;

  return (
    <div>
      {displayedSteps.map((step, index) => (
        <div key={index} className='formbot-response'>
          {step.stepType === 'bot' ? renderBotMessage(step) : (
            <div className='human-response'>
              <p>Your response: {step.value}</p>
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

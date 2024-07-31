import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Response({ flowId }) {
  const [stats, setStats] = useState({ views: 0, starts: 0, completions: 0 });
  const [humanResponses, setHumanResponses] = useState([]);
  
  useEffect(() => {
    // Increment views count when flowId changes
    setStats(prevStats => ({ ...prevStats, views: prevStats.views + 1 }));

    // Fetch human responses when flowId changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-flow/${flowId}`);
        if (response.data.status === 'Success') {
          setHumanResponses(response.data.humanResponses);
        }
      } catch (error) {
        console.error('Error fetching human responses:', error);
      }
    };

    if (flowId) {
      fetchData();
    }
  }, [flowId]);

  const completionRate = stats.starts > 0 ? ((stats.completions / stats.starts) * 100).toFixed(2) : 0;

  if (!flowId) {
    return (
      <div style={{ backgroundColor: '#18181B', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#69696973', fontSize: '3em', textAlign: 'center' }}>
          No Response yet collected
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className='response-header'>
          <div className='response-header-1'>
            <p>Views</p>
            <p>{stats.views}</p>
          </div>

          <div className='response-header-1'>
            <p>Starts</p>
            <p>{stats.starts}</p>
          </div>

          <div className='response-header-1'>
            <p>Completion rate</p>
            <p>{completionRate}%</p>
          </div>
        </div>

        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Submitted at</th>
                <th>Welcome</th>
                <th>Email</th>
                <th>Name</th>
                <th>Services</th>
                <th>Logs</th>
              </tr>
            </thead>
            <tbody>
              {humanResponses.map((response, index) => (
                <tr key={index}>
                  {/* Customize the following cells based on the structure of your response data */}
                  <td>{index + 1}</td>
                  <td>{response.submittedAt}</td>
                  <td>{response.welcome}</td>
                  <td>{response.email}</td>
                  <td>{response.name}</td>
                  <td>{response.services.join(', ')}</td>
                  <td>{response.logs.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Response;

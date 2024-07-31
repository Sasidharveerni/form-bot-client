import React from 'react'
import Logo from '../assets/SVG.png'
import DesignLogo1 from '../assets/SVG (1).png'
import DesignLogo2 from '../assets/SVG (2).png';
import FeatureImg from '../assets/image.png';
import FeatureImg2 from '../assets/image (1).png';
import FormLogo from '../assets/Container (1).png'
import Container from '../assets/Container.png';
import CompaniesImg from '../assets/Container (3).png';
import TypeBotImg from '../assets/typebot-standard.png';
import CompaniesImg2 from '../assets/Container (4).png';
// import ArrowLink from '../assets/SVG (4).png'


import VectorImg1 from '../assets/vectors/SVG (3).png';
import VectorImg2 from '../assets/vectors/Vector.png';
import VectorImg3 from '../assets/vectors/Vector (1).png';
import VectorImg4 from '../assets/vectors/Vector (2).png';
import VectorImg5 from '../assets/vectors/Vector (3).png';
import VectorImg6 from '../assets/vectors/Vector (3).png';

import '../App.css'
import { useNavigate } from 'react-router';

function HomePage({isLogin}) {
    const navigate = useNavigate();
    const vectorImages = [VectorImg1, VectorImg2, VectorImg3, VectorImg4, VectorImg5, VectorImg6]
    const names = ['Hidden Fields', 'Teams Colloboration', 'Link to sub typebots', 'Custom code', 'Custom domain', 'Folder management'];
    const Description = ['Include data in your form URL to segment your user and use its data directly in your form.', 'Invite your teammates to work on your typebots with you', 'Reuse your typebots in different parent bots.', 'Customize everything with your own Javascript & CSS code', 'Connect your typebot to the custom URL of your choice', 'Organize your typebots in specific folders to keep it clean and work with multiple clients']
    
    const supportLinks = ['Status', 'Documentaion', 'Roadmap', 'Pricing']

    const supportLinks2 = ['Discord', 'Github repository', 'Twitter', 'Linkedin', 'OSS Friends']

    const supportLinks3 = ['About', 'Contact', 'Terms of Service', 'Privacy Policy'];

    const redirect = () => {
        if(!isLogin) {
            navigate('/signup')
        } else {
            navigate('/workspace')
        }
    }
    
    return (
        <div style={{backgroundColor: '#121212', height: '100%'}}>
            <div className='home-header'>
                <div className='flex-prop'>
                    <img src={Logo} alt='' />
                    <p className='text'>FormBot</p>
                </div>
                <div>
                    <button className='button-1' onClick={() => navigate('/login')}>Sign in </button>
                    <button className='button-2' onClick={() => redirect()}>Create Form Button </button>
                </div>
            </div>

            <div className='home-container'>
                <div>
                    <img src={DesignLogo2} alt='' />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h1> Build advanced chatbots visually </h1>
                    <p> Typebot gives you powerful blocks to create unique chat experiences. Embed them
                        anywhere on your web/mobile apps and start collecting results like magic. </p>
                    <button className='button-3' onClick={() => redirect()}>
                        Create a FormBot for free
                    </button>
                </div>

                <div>
                    <img src={DesignLogo1} alt='' />
                </div>
            </div>

            <div>
                <img className='home-container-2' src={Container} alt='' />
            </div>

            <div className='home-section-1'>
                <h1>Replace your old school forms with
                    chatbots</h1>

                <p>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3 your conversion rate compared to classical forms.</p>

            </div>


            <div className='form-img'>
                <img src={FormLogo} alt='' />
            </div>


            <div className='home-section-2'>
                <div>
                    <img src={FeatureImg} alt='' />
                </div>
                <div>
                    <h2>Easy building experience</h2>
                    <p style={{ color: '#A0AEC0', fontSize: '0.8em' }}>All you have to do is drag and
                        drop blocks to create your app.
                        Even if you have custom needs,
                        you can always add custom
                        code.</p>
                </div>
            </div>

            <div className='home-section-2'>
                <div style={{ marginRight: '1em' }}>
                    <h2>Embed it in a click</h2>
                    <p className='fonts-style'>
                        Embedding your typebot in your applications is a walk in the park.
                        Typebot gives you several step-by-step platform- specific instructions.
                        Your typebot will always feel "native".</p>
                </div>
                <div>
                    <img src={FeatureImg2} alt='' />
                </div>
            </div>

            <div style={{ marginTop: '10vw', textAlign: 'center' }}>
                <img src={CompaniesImg} alt='' style={{ width: '95vw', height: '40vh' }} />
            </div>

            <div style={{ margin: '0 10vw' }}>
                <h2 style={{ marginBottom: 0 }}>Integrate with any platform</h2>
                <p style={{ maxWidth: '50vw', color: '#A0AEC0' }}>Typebot offers several native integrations blocks as well as instructions on how to embed typebot on particular platforms</p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10vw' }}>
                <h2>Collect results in a real time</h2>
                <p className='fonts-style'>One of the main advantage of a chat application is that you collect the user's responses on each question. <br></br>
                    <span>
                        You won't lose any valuable data.
                    </span>
                </p>

                <img src={TypeBotImg} alt='' style={{ marginTop: '5vw', width: '35vw' }} />
            </div>


            <div style={{ textAlign: 'center' }}>
                <h2>And many more features</h2>
                <p className='fonts-style'>Typebot makes form building easy and comes with powerful features</p>
            </div>

            <div className='home-section-3' style={{ marginTop: '5vw', marginBottom: '20vw' }}>
                {vectorImages.map((ele, ind) => (
                    <div>
                        <div key={ind} className='home-section-3' >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'transparent', position: 'relative', left: '9vw', bottom: '2vw' }}>

                                <div className='home-section-3-1'>
                                    <img src={ele} alt='' style={{ background: 'transparent' }} />
                                </div>
                                <p style={{ backgroundColor: 'transparent' }}>{names[ind]}</p>
                                <p style={{ color: '#718096', fontSize: '0.7em', backgroundColor: 'transparent', margin: 0 }}>{Description[ind]}</p>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>





            <div className='home-section-4' style={{ textAlign: 'center', marginBottom: '2vw' }}>
                <p>Loved by teams and creators from all around the world</p>
                <img src={CompaniesImg2} alt='' style={{ background: 'transparent', marginBottom: '5vw' }} />
            </div>

            <div className='home-section-5'>
                <img src={DesignLogo2} alt='' style={{ background: 'transparent' }} />

                <div style={{ textAlign: 'center', margin: 0, background: 'transparent',}}>
                    <h1 style={{background: 'transparent'}}>Improve conversion and user engagement with FormBots</h1>
                    <button className='button-3'>
                        Create a FormBot for free
                    </button>
                    <p style={{background: 'transparent'}}>No trail Generous <span>free</span> plan</p>
                <img src={DesignLogo1} alt='' style={{ background: 'transparent' }}/>
                </div>

            </div>


            <div style={{margin: '0 10vw', display: 'flex'}}>
                <p>Made with ❤️ by <br></br>@Cuvette</p>
                <ol style={{listStyleType: 'none'}}>
                {supportLinks.map((ele, ind) => (
                    <div key={ind} style={{display: 'flex', margin: '0vw 2vw 2vw 2vw', cursor: 'pointer', color: 'white'}}> 
                    <li style={{textDecoration: 'underline'}}>{ele}</li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V6.41421L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L17.5858 5H14ZM5 7C4.44772 7 4 7.44772 4 8V19C4 19.5523 4.44772 20 5 20H16C16.5523 20 17 19.5523 17 19V14.4375C17 13.8852 17.4477 13.4375 18 13.4375C18.5523 13.4375 19 13.8852 19 14.4375V19C19 20.6569 17.6569 22 16 22H5C3.34315 22 2 20.6569 2 19V8C2 6.34315 3.34315 5 5 5H9.5625C10.1148 5 10.5625 5.44772 10.5625 6C10.5625 6.55228 10.1148 7 9.5625 7H5Z" fill="#ffffff"></path> </g></svg>
                    </div>
                    
                ))}
                </ol>

                <ol style={{listStyleType: 'none'}}>
                {supportLinks2.map((ele, ind) => (
                    <div key={ind} style={{display: 'flex', margin: '0vw 2vw 2vw 2vw', cursor: 'pointer', color: 'white'}}> 
                    <li style={{textDecoration: 'underline'}}>{ele}</li>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V6.41421L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L17.5858 5H14ZM5 7C4.44772 7 4 7.44772 4 8V19C4 19.5523 4.44772 20 5 20H16C16.5523 20 17 19.5523 17 19V14.4375C17 13.8852 17.4477 13.4375 18 13.4375C18.5523 13.4375 19 13.8852 19 14.4375V19C19 20.6569 17.6569 22 16 22H5C3.34315 22 2 20.6569 2 19V8C2 6.34315 3.34315 5 5 5H9.5625C10.1148 5 10.5625 5.44772 10.5625 6C10.5625 6.55228 10.1148 7 9.5625 7H5Z" fill="#ffffff"></path> </g></svg>
                    </div>
                    
                ))}
                </ol>

                <ol style={{listStyleType: 'none'}}>
                {supportLinks3.map((ele, ind) => (
                    <div key={ind} style={{display: 'flex', margin: '0vw 2vw 2vw 2vw', cursor: 'pointer', color: 'white'}}> 
                    <li style={{textDecoration: 'underline'}}>{ele}</li>
                   
                    </div>
                    
                ))}
                </ol>

            </div>

        </div>
    )
}

export default HomePage
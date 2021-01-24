import React from 'react'
import './apps.css'
import img1 from './assets/logo.svg'
import img2 from './assets/info.svg'
import img3 from './assets/phone.svg'
import img4 from './assets/io.svg'
import img5 from './assets/android.svg'
import img6 from './assets/tester1.svg'
import img7 from './assets/tester2.svg'
import img8 from './assets/tester3.svg'
import img9 from './assets/steps.svg'
import img10 from './assets/map.svg'
import img11 from './assets/pic.svg'

export default function App() {
    return (
        <div className="cover">
            <nav>
                <img src={img1} />
                <ul>
                    <li>About</li>
                    <li>Our Story</li>
                    <li>Pricing</li>
                    <li>Testimonials</li>
                    <li>Help</li>
                </ul>
            </nav>
            <main>
                <div className="topic">
                    <div className='left'>
                        <h1>Helping seniors live safely at home for as long as possible</h1>
                        <p> A wearable device that tracks your health connects you with Help if needed.</p>
                        <button>Get Started</button>
                    </div>
                    <div className="right">
                        <p>App Mockup</p>
                    </div>
                </div>
                <img className="info" src={img2} />
                <div className='conv'>
                    <h3>Reasons to download the App now</h3>
                    <div className='show'>
                        <img src={img3} />
                        <ul>
                            <li>Track your vital signs continuously and alert a Healthcare Professional in case of anomaly.</li>
                            <li>Track and remind all your health appointments and support automated prescription refills. </li>
                            <li>In case of illness or accidents, help will be automatically triggered.</li>
                            <li>A Nurse is available 24/4 through our Healthline.</li>
                        </ul>
                    </div>
                    <img className="special" src={img4} />
                </div>
                <div className='test'>
                    <h3>What our customer have to say...</h3>
                    <div className="cards">
                        <Card name="Santiago Rivera" img={img6} rate="4.5"
                            text="“I can live better knowing that
                            someone is watching my Health all the time”." />
                        <Card name="Jessica Christy" img={img7} rate="5.0"
                            text="“It is fine that they are tracking my health.
                            I love that I don’t have to worry about my prescriptions anymore. 
                            All my medication is automatically refilled”." />
                        <Card name="Jenifer Ferreira" img={img8} rate="4.5"
                            text="“I recovered my freedom! 
                            My sons are not overprotective anymore. Now I can do whatever I want!”." />
                    </div>
                </div>
                <div className='steps'>
                    <h3>Steps</h3>
                    <img src={img9} />
                </div>
                <img className="maps" src={img10} />
                <img className="pics" src={img11} />
            </main>
        </div>
    )
}

function Card(props){
    return(
        <div className='card'>
            <div className='top'>
                <img src={props.img} />
                <h4>{props.name}</h4>
                <p>{props.rate}</p>
            </div>
            <div className='bottom'>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
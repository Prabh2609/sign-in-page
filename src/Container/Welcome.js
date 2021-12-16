import React from 'react'
import welcomeImg from '../Container/welcome.jpeg'

export default function Welcome() {
    return (
        <div>
            <img src={welcomeImg} style={{width:'100%',height:'100%'}}/>
        </div>
    )
}

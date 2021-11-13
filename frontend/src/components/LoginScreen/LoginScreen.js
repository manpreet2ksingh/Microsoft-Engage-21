import React from 'react'
import Layout from './Layout'

const LoginScreen = (props)=>{
    return (
        <div>
            <Layout loginas={props.location.state.account}/>
        </div>
    )
}

export default LoginScreen;
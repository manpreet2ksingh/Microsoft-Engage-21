import React,{useState} from 'react'
import {signin} from '../API/api'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { Redirect } from 'react-router-dom'

// import $ from 'jquery';
const Layout = (props)=>{

    const {loginas} = props

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const [redirect,setRedirect] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault();

        setLoading(true)

        await signin({email,password})
        .then(data=>{
            if(data.error)
            {
                setError(data.error)
                setLoading(false)
            }
            else{
                localStorage.setItem('userInfo',JSON.stringify(data))
                setRedirect(true)
            }
        })
        setLoading(false)
    }

    const RedirectUser = ()=>{
        if(redirect){
            if(loginas === 'Teacher')
            {
                return <Redirect to='/teacherDashboard'/>
            }
            else{
                console.log(loginas);
                return <Redirect to='/studentDashboard'/>
            }
        }
    }

    const signInForm = ()=>(
        <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="assets/images/img-01.png" alt="IMG" />
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">
                                {loginas} Login
                            </span>

                            <div className="wrap-input100 validate-input" 
                                data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" 
                                        type="text" 
                                        name="email" 
                                        placeholder="Email" 
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" 
                                data-validate = "Password is required">
                                <input className="input100" 
                                        type="password" 
                                        name="pass" 
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e)=>{setPassword(e.target.value)}} />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={handleSubmit}>
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2">
                                    Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )

    return (
        <div>
            {error && <ErrorMessage variant='danger' >{error}</ErrorMessage>}
            {loading && <Loading />}
            {signInForm()}
            {RedirectUser()}
        </div>
    )
}

export default Layout;
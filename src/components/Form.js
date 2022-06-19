import React, { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions } from '../store/dataSlice'
import { useNavigate, Link } from 'react-router-dom'



const Form = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    let Incomingdata = useSelector((state) => state.data)
    let adminData = useSelector((state) => state.admin)
    let adminIsAvailable = useSelector((state) => state.isAdmin)
    const [id, setId] = useState(Incomingdata.length + 1)
    const [alreadyExist, setAlreadyExist] = useState(false)
    const [isSwitchedToAdmin, setIsSwitchedtoAdmin] = useState(false)
    //first name
    const {
        value: firstNameValue,
        isValid: eneteredNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput((value) => value.trim() !== '')
    // last name
    const {
        value: lastNameValue,
        isValid: eneteredLastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput((value) => value.trim() !== '')

    //email
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((value) => value.includes('@'))

    // password    
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value) => value.trim() !== '')
    // confirm Password
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: confirmPasswordReset
    } = useInput((value) => value.trim() !== '')

    let matchingPass = false
    if (passwordValue === confirmPasswordValue) {
        matchingPass = true
    }

    let formIsValid = false
    if (eneteredNameIsValid && eneteredLastNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && matchingPass) {
        formIsValid = true
    }

    const formSubmitter = (e) => {
        // debugger
        e.preventDefault();
        setId(id + 1)



        let url;
        let data;
        if (isSwitchedToAdmin) {
            url = 'https://auth-7fa28-default-rtdb.firebaseio.com/admin.json'
            data = adminData[0]
        }
        else {
            url = 'https://auth-7fa28-default-rtdb.firebaseio.com/users.json'
            data = Incomingdata[0]
        }


        console.log(data);
        const authUser = async () => {
            if (!data.find(obj => obj.email === emailValue)) {
                console.log('alreadyExist');
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            id,
                            firstNameValue,
                            lastNameValue,
                            emailValue,
                            passwordValue,
                            confirmPasswordValue,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok) {
                        const data = await response.json();
                        let errorMessage = data.error.message
                        throw new Error(errorMessage)
                    }

                }
                catch (error) {
                    console.log(error);
                }
                navigate('/login')
                setAlreadyExist(false)
                firstNameReset();
                lastNameReset();
                emailReset();
                passwordReset();
                confirmPasswordReset();
            } setAlreadyExist(true)
        }
        authUser()
    }

    const adminSwitchHandler = () => {
        adminIsAvailable ? setIsSwitchedtoAdmin(false) : setIsSwitchedtoAdmin(!isSwitchedToAdmin)
    }


    return (
        <>
            <form onSubmit={formSubmitter} className='theForm'>
                <div className={isSwitchedToAdmin ? 'admin' : 'user'}>
                    <h3>{isSwitchedToAdmin ? 'Admin' : 'User'} From</h3>


                    <div className={firstNameHasError ? 'form-control invalid' : 'form-control'}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id='firstName' value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler} />
                        {firstNameHasError && <p className='error-text'> First Name should not be empty </p>}
                    </div>

                    <div className={lastNameHasError ? 'form-control invalid' : 'form-control'
                    }>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id='lastName' value={lastNameValue}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler} />
                        {lastNameHasError && <p className='error-text'> Last Name should not be empty </p>}
                    </div>

                    <div className={emailHasError ? 'form-control invalid' : `form-control ${alreadyExist ? 'invalid' : ''}`}
                    >
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler} />
                        {emailHasError && <p className='error-text'> Email should not be empty </p>}
                    </div>

                    <div className={passwordHasError ? 'form-control invalid' : `form-control`}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' minLength={6} value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler} />
                        {passwordHasError && <p className='error-text'> Password should not be empty </p>}
                    </div>

                    <div className={confirmPasswordHasError ? 'form-control invalid' : 'form-control'}>
                        <label htmlFor="confirmPass">Confirm Password</label>
                        <input type="password" id='confirmPass' minLength={6} value={confirmPasswordValue}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler} />
                        {confirmPasswordHasError && <p className='error-text'> Password should not be empty </p>}
                        {confirmPasswordHasError && matchingPass && <p className='error-text'> Password should Match </p>}
                    </div>
                    <button type='submit' disabled={!formIsValid} >Submit</button>
                    {alreadyExist && <p className='error-text'> user already exists</p>}

                    <p>Already a user? <Link to='/login' >Login in here</Link>  </p>
                </div>
                <div>
                    {!adminIsAvailable && <button type='button' onClick={adminSwitchHandler} > Switch to {isSwitchedToAdmin || adminIsAvailable ? 'User' : 'Admin'}</button>}
                    {adminIsAvailable ? <p>Admin already Exists</p> : <p>Note: Admin is not registered! Enter Admin Cradentials</p>}
                </div>
            </form>
        </>
    )
}

export default Form
import useInput from '../hooks/useInput'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { dataActions } from '../store/dataSlice'
import DisplayData from './DisplayData'


const Login = () => {
    let Incomingdata = useSelector((state) => state.data)
    let adminData = useSelector((state) => state.admin)
    const [isAdmin, setIsAdmin] = useState(true)
    const dispatch = useDispatch()
    const [matchedData, setMatchedData] = useState()
    const navigate = useNavigate()



    let url;
    let reduxData;
    if (isAdmin) {
        url = 'https://auth-7fa28-default-rtdb.firebaseio.com/admin.json'
        reduxData = adminData[0]
        dispatch(dataActions.setAdmin(true))
    }
    else {
        url = 'https://auth-7fa28-default-rtdb.firebaseio.com/users.json'
        reduxData = Incomingdata[0]
        dispatch(dataActions.setAdmin(false))
    }
    useEffect(
        () => {
            const getData = async () => {

                const response = await fetch(url);
                const data = await response.json()
                const userdata = []
                for (const key in data) {

                    userdata.push({
                        id: data[key].id,
                        firstName: data[key].firstNameValue,
                        lastName: data[key].lastNameValue,
                        email: data[key].emailValue,
                        password: data[key].passwordValue,
                        confirmPassword: data[key].confirmPasswordValue,
                    })
                }
                console.log('use Effect of userData ', reduxData);
                isAdmin ? dispatch(dataActions.storeAdmin(userdata)) : dispatch(dataActions.storeData(userdata))
            }
            getData()
        }, [])


    //first name
    const {
        value: userName,
        isValid: userNameIsValid,
        hasError: userNameHasError,
        valueChangeHandler: userNameChangeHandler,
        inputBlurHandler: userNameBlurHandler,
        reset: userNameReset
    } = useInput((value) => value.trim() !== '')
    // last name
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((value) => value.trim() !== '')

    let formIsValid = false
    if (userNameIsValid && passwordIsValid) {
        formIsValid = true
    }
    const formSubmitter = (e) => {
        e.preventDefault();
        console.log(reduxData);

        if (reduxData.find(obj => obj.email === userName && obj.password === passwordValue)) {
            let user = reduxData.find(obj => obj.email === userName)
            setMatchedData(user)
            dispatch(dataActions.loginHandler())
        }
        else {
            console.log('no match');
        }

        userNameReset()
        passwordReset()
        // loginUser()
        navigate('/data')
    }
    const toggleAdmin = () => { setIsAdmin(!isAdmin) }
    // console.log('data matched is', matchedData);

    return (<>
        <h3>{isAdmin ? 'Admin ' : 'User '} Login </h3>
        <form onSubmit={formSubmitter} className='theForm'>
            <div className={isAdmin ? 'admin' : 'user'}>

                <div className={userNameHasError ? 'form-control invalid' : 'form-control'}>
                    <label htmlFor="firstName">Email</label>
                    <input type="email" id='firstName' value={userName}
                        onChange={userNameChangeHandler}
                        onBlur={userNameBlurHandler} />
                    {userNameHasError && <p className='error-text'> Email should not be empty </p>}
                </div>

                <div className={passwordHasError ? 'form-control invalid' : 'form-control'
                }>
                    <label htmlFor="lastName">Password</label>
                    <input type="password" id='lastName' value={passwordValue}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler} />
                    {passwordHasError && <p className='error-text'>password should not be empty </p>}
                </div>
                <button type='submit' disabled={!formIsValid} >Submit</button>
            </div>
        </form>
        <button type='button' onClick={toggleAdmin}> Switch to {isAdmin ? 'User ' : 'Admin '} Login </button>
        {matchedData && <p> Welcome Back {matchedData.firstName} {matchedData.lastName} </p>}
        {matchedData && <DisplayData name={matchedData.firstName} />}
    </>
    )
}

export default Login
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../store/dataSlice'

const Home = (props) => {
    let isLoggedIn = useSelector((state) => state.isLoggedIn)
    const isAdmin = useSelector((state) => state.isAdmin)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logOutHandler = () => {
        if (isLoggedIn) {
            dispatch(dataActions.logoutHandler())
            navigate('/login')
        }
        else {
            navigate('/login')
        }
    }
    return (
        <>
            <div className='navbar'>
                <h3>Home</h3>
                <div>
                    {/* <span className='margin-x'><Link className='link' to='/login'>Login</Link></span> */}
                    {/* <span className='margin-x'><Link className='link' to='/data'>Data</Link></span> */}
                    {/* <span className='margin-x'><Link className='link' to='/signup'>Signup</Link></span> */}
                    {!isAdmin && isLoggedIn && <span>Add Courses</span>}
                    {isAdmin && isLoggedIn && <span>Give Green Pass</span>}
                    <button onClick={logOutHandler}>{isLoggedIn ? 'Logout' : 'Login'}</button>
                    {!isLoggedIn && <button onClick={() => navigate('/signup')} > Signup</button>}
                </div>
            </div>
            <div>
                <h1>Home</h1>
                {props.children}
            </div>
        </>
    )
}

export default Home
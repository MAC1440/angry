import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../store/dataSlice'

const Home = (props) => {
    let isLoggedIn = useSelector((state) => state.data.isLoggedIn)
    const isAdmin = useSelector((state) => state.data.isAdmin)
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
                    {!isAdmin && isLoggedIn && <span className='margin-x'> <Link className='link' to='/add-course'> Add Course</Link></span>}
                    {!isAdmin && isLoggedIn && <span className='margin-x'><Link className='link' to='/courses'> View Courses</Link></span>}
                    {isAdmin && isLoggedIn && <span className='margin-x'>Give Green Pass</span>}
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
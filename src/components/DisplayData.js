import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dataActions } from '../store/dataSlice';



const DisplayData = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const goBackHandler = () => {
    nav('/')
  }
  const deleteHandler = (id) => {
    dispatch(dataActions.deleteData(id))
  }

  let Incomingdata = useSelector((state) => state.data)
  console.log('data show ', Incomingdata[0]);
  let data = Incomingdata[0];

  return (
  <div>


    <h1>{props.name}</h1>


    <button onClick={goBackHandler}>Go to Home</button>

  </div>

  )
}

export default DisplayData
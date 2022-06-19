import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../../../hooks/useInput'
import { coursesActions } from '../../../store/courseSlice'

const AddCourse = () => {
    const courses = useSelector((state) => state.courses.courses)
    const key = useSelector((state) => state.data.data[0])
    const dispatch = useDispatch()
    const {
        value: courseValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: valueBlurHandler,
        reset: Reset
    } = useInput((value) => value.trim() !== '')

    let formIsValid = false
    if (valueIsValid) {
        formIsValid = true
    }
    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(coursesActions.storecourses(courseValue))
        console.log(courses);
        console.log('this is usersData',key[0].id);

    }
    return (
        <form action="" className=' theForm' onSubmit={sumbitHandler}>
            <div className={hasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor="add">Add a course</label>
                <input type="text" name="" id="add"
                    value={courseValue}
                    onChange={valueChangeHandler}
                    onBlur={valueBlurHandler}
                />
            </div>
            {hasError && <p className='error-text' > input inValid </p>}
            <button type='submit' disabled={!formIsValid}>Submit</button>
        </form>)
}

export default AddCourse
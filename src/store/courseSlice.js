import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice(
    {
        name: 'courses',
        initialState: { courses: []},
        reducers: {
            storecourses(state, action) {
                console.log('course name is', action.payload);
                state.courses = [...state.courses, action.payload]
            },


        }

    }
)

export const coursesActions = coursesSlice.actions
export default coursesSlice
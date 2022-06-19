import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice(
    {
        name: 'courses',
        initialState: { courses: []},
        reducers: {
            storecourses(state, action) {
                const newitem = action.payload;
                state.courses = [...state.courses, action.payload]
            },


        }

    }
)

export const coursesActions = courseSlice.actions
export default courseSlice
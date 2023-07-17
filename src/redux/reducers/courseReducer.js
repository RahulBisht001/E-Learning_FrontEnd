import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
    {
        courses: [],
        lectures: []
    },
    {
        allCourseRequest: state => {
            state.loading = true;
        },
        allCourseSuccess: (state, action) => {
            state.loading = false;
            state.courses = action.payload.courses;
        },
        allCourseFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        getCourseRequest: state => {
            state.loading = true;
        },
        getCourseSuccess: (state, action) => {
            state.loading = false;
            state.lectures = action.payload.lectures;
        },
        getCourseFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        clearError: state => {
            state.error = null;
        },
        clearMessage: state => {
            state.message = null;
        },


        addToPlaylistRequest: state => {
            state.loading = true;
        },
        addToPlaylistSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addToPlaylistFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);

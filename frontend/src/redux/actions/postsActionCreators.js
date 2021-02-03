import * as constants from '../constants';

export const fetchAllPosts = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/api/posts',
        success: (response) => (setAllPosts(response))
    }
});

export const createPost = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/posts',
        data,
        success: (post) => (addPost(post)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getPostById = (postId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/posts/${postId}`,
        postProcessSuccess: onSuccess
    }
});

export const updatePostById = (postId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/api/posts/${postId}`,
        data,
        success: (postId, data) => (updatePost(postId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deletePostById = (postId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/api/posts/${postId}`,
        success: () => (removePost(postId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addPost = (post) => ({
    type: constants.ADD_POST,
    payload: post
});

const setAllPosts = (data) => ({
    type: constants.SET_ALL_POSTS,
    payload: data
});

const updatePost = (postId, data) => ({
    type: constants.UPDATE_POST,
    payload: { postId, data }
});

const removePost = (postId) => ({
    type: constants.REMOVE_POST,
    payload: postId
});
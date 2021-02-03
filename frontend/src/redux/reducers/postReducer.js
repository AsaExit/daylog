import * as constants from '../constants';

export default function postsReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_POSTS:
            return action.payload;
        case constants.ADD_POST:
            return state.concat(action.payload);
        case constants.REMOVE_POST:
            return state.filter(item => item._id !== action.payload);
        case constants.UPDATE_POST:
            return state.map(item => {
                if (item._id === action.payload.postId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}
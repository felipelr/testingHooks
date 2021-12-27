import { COUNT_DECREMENT, COUNT_INCREMENT } from '../constants/actionTypes'

const countReducer = (state, action) => {
    switch (action.type) {
        case COUNT_INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };
        case COUNT_DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

export default countReducer;
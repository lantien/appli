const initialState = {

    apiUrl: "http://192.168.1.22/",
    token: ""
};

const myReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case 'SET_TOKEN':
            nextState = {
                ...state,
                token: action.token
            }

        return nextState || state
    default:
        return state
    }
};

export default myReducer;
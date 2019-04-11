const initialState = {
    
    token: "",
    orderList: [],
    basket: [],
    total: 0,
    shopID: "",
    currency: ""
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
        case 'SET_ORDERS':
            nextState = {
                ...state,
                orderList: action.orderList
            }
            return nextState || state
        case 'ADD_ORDER':
            nextState = {
                ...state,
                orderList:[...state.orderList, action.orderList]
            }
            return nextState || state
        case 'ADD_ITEM' :
            nextState = {
                ...state,
                total: state.total + action.prix,
                basket: [...state.basket, action.item]
            }
            return nextState || state
        case 'REMOVE_ITEM':        
            nextState = {
                ...state,
                total: state.total - action.obj.prix,
                basket: state.basket.slice(0, action.obj.id).concat(state.basket.slice(action.obj.id + 1))
            }
            return nextState || state
        case 'SET_SHOP' :
            nextState = {
                ...state,
                shopID: action.id
            }
            return nextState || state
        case 'SET_CURRENCY' :
            nextState = {
                ...state,
                currency: action.currency
            }
            return nextState || state
        default:
            return state
    }
};

export default myReducer;
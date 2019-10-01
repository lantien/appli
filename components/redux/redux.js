import { newTS } from "uuid-js";

const initialState = {
    
    token: "",
    orderList: [],
    basket: [],
    total: 0,
    shopID: "",
    currency: "",
    user: {
        firstname: "",
        lastname: "",
        email: ""
    },
    willPay: false
};

const myReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case 'MINUS_ONE': 
            nextState = {
                ...state,
                basket: state.basket
                        .map(
                            (item, i) => {

                                if(i == action.id) {

                                    item.quantity -= 1;

                                }
                                return item;
                            }
                        )
                        .filter(e => e.quantity > 0)
                ,
                total: state.total - action.prix,
            }
            return nextState || state
        case 'PLUS_ONE': 
            nextState = {
                ...state,
                basket: state.basket.map(
                    (item, i) => {

                        if(i == action.id) {

                            item.quantity += 1;
                        }
                        return item;
                    }
                ),
                total: state.total + action.prix,
            }
            return nextState || state
        case 'SET_WILLPAY': 
            nextState = {
                ...state,
                willPay: action.willPay
            }
            return nextState || state
        case 'SET_TOKEN':
            nextState = {
                ...state,
                token: action.token
            }
            return nextState || state
        case 'SET_USER':
            nextState = {
                ...state,
                user: action.user
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
                orderList:[action.orderList, ...state.orderList]
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
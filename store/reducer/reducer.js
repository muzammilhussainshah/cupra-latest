import { SIGNUPUSER, CURRENTUSER, SERVICES,SUBSERVICES, ISLOADER, ISERROR, SHOPCATOGERY, SHOPSUBCATOGERY,ITEMDETAILS } from "../constant/constant";

const INITIAL_STATE = {
    signUpUser: false,
    currentUser: {},
    shopCatogery: {},
    shopSubCatogery: {},
    shopItemDetails: {},
    services: {},
    subservices: {},
    isLoader: false,
    isError: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUPUSER:
            return ({
                ...state,
                signUpUser: action.payload
            })
        case ISLOADER:
            return ({
                ...state,
                isLoader: action.payload
            })
        case ISERROR:
            return ({
                ...state,
                isError: action.payload
            })
        case CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case SHOPCATOGERY:
            return ({
                ...state,
                shopCatogery: action.payload
            })
        case SHOPSUBCATOGERY:
            return ({
                ...state,
                shopSubCatogery: action.payload
            })
        case ITEMDETAILS:
            return ({
                ...state,
                shopItemDetails: action.payload
            })
        case SERVICES:
            return ({
                ...state,
                services: action.payload
            })
        case SUBSERVICES:
            return ({
                ...state,
                subservices: action.payload
            })
        default:
            return state;
    }

}
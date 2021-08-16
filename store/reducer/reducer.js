import { SIGNUPUSER, CURRENTUSER ,ISLOADER,ISERROR} from "../constant/constant";

const INITIAL_STATE = {
    signUpUser: false,
    currentUser: {},
    isLoader: false,
    isError: "",
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
        default:
            return state;
    }

}
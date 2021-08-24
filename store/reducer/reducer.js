import { SIGNUPUSER, CURRENTUSER, SERVICES, GETNEWSIMAGES, SUBSERVICES, NEWSCOMMENT, ISLOADER, ISERROR, GETSTORIES, SHOPCATOGERY, SHOPSUBCATOGERY, ITEMDETAILS, GETREVIEWS, GETNEWS, NEWSITEMDETAILS, GETADDS, STORIESLIST } from "../constant/constant";

const INITIAL_STATE = {
    signUpUser: false,
    currentUser: {},
    shopCatogery: {},
    shopSubCatogery: {},
    shopItemDetails: {},
    newsItemDetails: {},
    services: {},
    subservices: {},
    getNews: {},
    newsComment: {},
    getAdds: {},
    getStories: {},
    getNewsImages: {},
    storiesList: {},
    getReviews: {},
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
        case GETREVIEWS:
            return ({
                ...state,
                getReviews: action.payload
            })
        case GETNEWS:
            return ({
                ...state,
                getNews: action.payload
            })
        case NEWSITEMDETAILS:
            return ({
                ...state,
                newsItemDetails: action.payload
            })
        case GETADDS:
            return ({
                ...state,
                getAdds: action.payload
            })
        case STORIESLIST:
            return ({
                ...state,
                storiesList: action.payload
            })
        case NEWSCOMMENT:
            return ({
                ...state,
                newsComment: action.payload
            })
        case GETSTORIES:
            return ({
                ...state,
                getStories: action.payload
            })
        case GETNEWSIMAGES:
            return ({
                ...state,
                getNewsImages: action.payload
            })
        default:
            return state;
    }

}
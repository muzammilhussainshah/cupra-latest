import {
  SIGNUPUSER,
  CURRENTUSER,
  SERVICES,
  SUBSERVICES,
  ISLOADER,
  ISERROR,
  SHOPCATOGERY,
  SHOPSUBCATOGERY,
  ITEMDETAILS,
  GETREVIEWS,
  GETNEWS,
  NEWSITEMDETAILS,
  VIDEOS,
} from '../constant/constant';

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
  getReviews: {},
  isLoader: false,
  isError: false,
  videos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUPUSER:
      return {
        ...state,
        signUpUser: action.payload,
      };
    case ISLOADER:
      return {
        ...state,
        isLoader: action.payload,
      };
    case ISERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case CURRENTUSER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SHOPCATOGERY:
      return {
        ...state,
        shopCatogery: action.payload,
      };
    case SHOPSUBCATOGERY:
      return {
        ...state,
        shopSubCatogery: action.payload,
      };
    case ITEMDETAILS:
      return {
        ...state,
        shopItemDetails: action.payload,
      };
    case SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case SUBSERVICES:
      return {
        ...state,
        subservices: action.payload,
      };
    case GETREVIEWS:
      return {
        ...state,
        getReviews: action.payload,
      };
    case GETNEWS:
      return {
        ...state,
        getNews: action.payload,
      };
    case NEWSITEMDETAILS:
      return {
        ...state,
        newsItemDetails: action.payload,
      };
    case VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    default:
      return state;
  }
};

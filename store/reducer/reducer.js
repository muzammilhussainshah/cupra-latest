import {
  SIGNUPUSER, CURRENTUSER, SERVICES, GETNEWSIMAGES, SUBSERVICES, NEWSCOMMENT, ISLOADER,
  ISERROR, GETSTORIES, SHOPCATOGERY, SHOPSUBCATOGERY, ITEMDETAILS, GETREVIEWS, GETNEWS,
  NEWSITEMDETAILS, GETADDS, STORIESLIST, VIDEOS, PAGINATIONLOADER, GETCITY, MYPROFILE,SHOPSELECTEDHORIZONTALTAB,
  GETFAVCARS, GETMODELS, GETBRANDS, CONTACTUSINFO, COMPANYPOLICY, NOTIFICATION, COMPANYREVIEWS, 
  GETCOUNTRY,ADS,SHOPSCROLL,HOMESCROLL
} from "../constant/constant";

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
  paginationLoader: false,
  isError: false,
  videos: [],
  getCity: {},
  myProfile: [],
  getFavCars: {},
  getModels: {},
  getBrands: {},
  contactUsInfo: {},
  companyPolicy: {},
  notification: {},
  companyReviews: {},
  country: {},
  ads: {},
  shopScroll: 0,
  homeScroll: 0,
  
  shopSelectedHorizontaltab:'',
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
    case PAGINATIONLOADER:
      return ({
        ...state,
        paginationLoader: action.payload
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
    case VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case GETCITY:
      return {
        ...state,
        getCity: action.payload,
      };
    case MYPROFILE:
      return {
        ...state,
        myProfile: action.payload,
      };
    case GETFAVCARS:
      return {
        ...state,
        getFavCars: action.payload,
      };
    case GETMODELS:
      return {
        ...state,
        getModels: action.payload,
      };
    case GETBRANDS:
      return {
        ...state,
        getBrands: action.payload,
      };
    case CONTACTUSINFO:
      return {
        ...state,
        contactUsInfo: action.payload,
      };
    case COMPANYPOLICY:
      return {
        ...state,
        companyPolicy: action.payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case COMPANYREVIEWS:
      return {
        ...state,
        companyReviews: action.payload,
      };
    case GETCOUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case SHOPSCROLL:
      return {
        ...state,
        shopScroll: action.payload,
      };
    case HOMESCROLL:
      return {
        ...state,
        homeScroll: action.payload,
      };
    case SHOPSELECTEDHORIZONTALTAB:
      return {
        ...state,
        shopSelectedHorizontaltab: action.payload,
      };
    case ADS:
      return {
        ...state,
        ads: action.payload,
      };
    default:
      return state;
  }

}
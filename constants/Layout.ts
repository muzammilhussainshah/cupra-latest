import {Dimensions, Platform} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const isSmallDevice = width < 375;
export const TextInputMode = Platform.OS === 'web' ? 'flat' : 'outlined';

import {ImageSourcePropType} from 'react-native';

export interface IUser {
  id: string;
  uri?: ImageSourcePropType;
}
export const StaticUsers: IUser[] = [
  {
    id: '1',
    uri: require('../assets/users/avatars-material-woman-5.png'),
  },
  {
    id: '2',
    uri: require('../assets/users/avatars-material-woman-4.png'),
  },
  {
    id: '3',
    uri: require('../assets/users/avatars-material-woman-3.png'),
  },
  {
    id: '4',
    uri: require('../assets/users/avatars-material-man-2.png'),
  },
  {
    id: '5',
    uri: require('../assets/users/avatars-material-woman-2.png'),
  },
];

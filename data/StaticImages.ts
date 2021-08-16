import { ImageSourcePropType } from 'react-native';

export interface IImages {
  id: string;
  uri?: ImageSourcePropType;
}
export const StaticImages: IImages[] = [
  {
    id: '1',
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '2',
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '3',
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '4',
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '5',
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '6',
    uri: require('../assets/images/mask.png'),
  },
];

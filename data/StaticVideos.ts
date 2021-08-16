import { ImageSourcePropType } from 'react-native';

export interface IVideoCover {
  id: string;
  uri?: ImageSourcePropType;
  price_range?: number;
  sub_service_number?: number;
  sub_service_rate?: number;
}
export const StaticVideos: IVideoCover[] = [
  {
    id: '1',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
  {
    id: '2',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
  {
    id: '3',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
  {
    id: '4',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
  {
    id: '5',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
  {
    id: '7',
    uri: require('../assets/images/mask.png'),
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
  },
];

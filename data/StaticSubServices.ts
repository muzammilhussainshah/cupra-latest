import {ImageSourcePropType} from 'react-native';

export interface ISubService {
  id: string;
  sub_service_name?: string;
  price_range?: number;
  sub_service_number?: number;
  sub_service_rate?: number;
  uri?: ImageSourcePropType;
}

export const SubServices: ISubService[] = [
  {
    id: '1',
    sub_service_name: 'Cable',
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '2',
    sub_service_name: 'Clean',
    price_range: 20,
    sub_service_number: 10,
    sub_service_rate: 5,
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '3',
    sub_service_name: 'Wax',
    price_range: 60,
    sub_service_number: 90,
    sub_service_rate: 4.4,
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '4',
    sub_service_name: 'Sub 1',
    price_range: 10,
    sub_service_number: 0,
    sub_service_rate: 1.4,
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '5',
    sub_service_name: 'Sub 2',
    price_range: 100,
    sub_service_number: 40,
    sub_service_rate: 4.5,
    uri: require('../assets/images/mask.png'),
  },
  {
    id: '6',
    sub_service_name: 'Sub 3',
    price_range: 30,
    sub_service_number: 20,
    sub_service_rate: 1.4,
    uri: require('../assets/images/mask.png'),
  },
];

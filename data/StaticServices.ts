import {ImageSourcePropType} from 'react-native';
import {ISubService} from './StaticSubServices';

export interface IService {
  id: string;
  uri?: ImageSourcePropType;
  rate?: number;
  service_name?: string;
  service_type?: string;
  number_of_servies?: number;
  sub_services?: ISubService;
}
export const StaticServices: IService[] = [
  {
    id: '1',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 1',
    number_of_servies: 30,
    sub_services: {
      id: '1',
      sub_service_name: 'Cable',
      price_range: 30,
      sub_service_number: 20,
      sub_service_rate: 1.4,
    },
  },
  {
    id: '2',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 2',
    number_of_servies: 10,
    sub_services: {
      id: '2',
      sub_service_name: 'Clean',
      price_range: 20,
      sub_service_number: 10,
      sub_service_rate: 5,
    },
  },
  {
    id: '3',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 3',
    number_of_servies: 0,
    sub_services: {
      id: '3',
      sub_service_name: 'Wax',
      price_range: 60,
      sub_service_number: 90,
      sub_service_rate: 4.4,
    },
  },
  {
    id: '4',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 4',
    number_of_servies: 1,
    sub_services: {
      id: '4',
      sub_service_name: 'Sub 1',
      price_range: 10,
      sub_service_number: 0,
      sub_service_rate: 1.4,
    },
  },
  {
    id: '5',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 5',
    number_of_servies: 79,
    sub_services: {
      id: '5',
      sub_service_name: 'Sub 2',
      price_range: 100,
      sub_service_number: 40,
      sub_service_rate: 4.5,
    },
  },
  {
    id: '5',
    uri: require('../assets/images/mask.png'),
    rate: 4.4,
    service_name: 'Service 5',
    number_of_servies: 79,
    sub_services: {
      id: '6',
      sub_service_name: 'Sub 3',
      price_range: 30,
      sub_service_number: 20,
      sub_service_rate: 1.4,
    },
  },
];

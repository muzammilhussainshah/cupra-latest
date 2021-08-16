import { ImageSourcePropType } from 'react-native';

export interface IShop {
  id: string;
  uri?: ImageSourcePropType;
  rate?: number;
  service_name?: string;
  remaining?: number;
  price?: number;
  sub_service_rate?: number;
  description?: string;
  color?: string;
  size?: {
    height?: number;
    width?: number;
    diameter?: number;
  };
  treatment?: string
}

export const StaticShop: IShop[] = [{
  id: '1',
  sub_service_rate: 1.4,
  uri: require('../assets/images/mask.png'),
  rate: 4.4,
  service_name: 'Test',
  remaining: 12,
  price: 190,
  description: ' Luxury Swedian Chair is a contemporary chair based on the virtues of modern craft. it carries on the simplicity and honestly of the archetypical chair.',
  color: '#000',
  treatment: 'Jati Wood, Canvas,Amazing Love',
  size: {
    height: 120,
    width: 100,
    diameter: 50
  }
}, {
  id: '2',
  sub_service_rate: 1.4,
  uri: require('../assets/images/mask.png'),
  rate: 4.4,
  service_name: 'Test',
  remaining: 12,
  price: 190,
  description: 'Luxury Swedian Chair is a contemporary chair based on the virtues of modern craft. it carries on the simplicity and honestly of the archetypical chair.',
  color: '#2ea2ab',
  treatment: 'Jati Wood, Canvas,Amazing Love',
  size: {
    height: 120,
    width: 100,
    diameter: 50
  }

},
{
  id: '3',
  sub_service_rate: 1.4,
  uri: require('../assets/images/mask.png'),
  rate: 4.4,
  service_name: 'Test',
  remaining: 12,
  price: 190,
  description: 'Luxury Swedian Chair is a contemporary chair based on the virtues of modern craft. it carries on the simplicity and honestly of the archetypical chair.',
  color: '#2ea221',
  treatment: 'Jati Wood, Canvas,Amazing Love',
  size: {
    height: 120,
    width: 100,
    diameter: 50
  }

}]

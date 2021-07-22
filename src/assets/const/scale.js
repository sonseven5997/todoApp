import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const designWidth = 375;
const designHeight = 768;
export const SCALE_WIDTH = SCREEN_WIDTH / designWidth;
export const SCALE_HEIGHT = SCREEN_HEIGHT / designHeight;

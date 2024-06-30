import { Platform } from'react-native';
export const isMobile = Platform.OS !== 'web' || (Platform.OS === 'web' && window.innerWidth <= 430);


/**
 * @format
 */
import './gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import MainLayout from './src/layouts/MainLayout';

AppRegistry.registerComponent(appName, () => MainLayout);

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require('./src/services/service'));

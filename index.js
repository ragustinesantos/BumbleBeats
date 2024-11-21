/**
 * @format
 */
import './gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Main from './src/Main';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => Main);

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require('./src/services/service'));

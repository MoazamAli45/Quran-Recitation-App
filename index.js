/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './audioPlayerService';

AppRegistry.registerComponent(appName, () => App);
//   FOR REGISTERING THE PLAYBACK SERVICE
TrackPlayer.registerPlaybackService(() => playbackService);

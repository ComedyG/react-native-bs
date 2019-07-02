/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import home from './src/components';


AppRegistry.registerComponent(appName, () => home);

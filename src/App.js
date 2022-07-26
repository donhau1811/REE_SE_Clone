// ** Router Import
import Router from './router/Router'
import { hot } from 'react-hot-loader/root'

/* 
React Hot Loader is a plugin that allows React components to be live reloaded without the loss of state. 
It works with Webpack and other bundlers that support both Hot Module Replacement (HMR) and Babel plugins.
*/

const App = () => <Router />

export default process.env.NODE_ENV === 'development' ? hot(App) : App

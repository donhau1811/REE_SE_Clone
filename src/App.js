// ** Router Import
import Router from './router/Router'
import { hot } from 'react-hot-loader/root'

const App = () => <Router />

export default process.env.NODE_ENV === "development" ? hot(App) : App

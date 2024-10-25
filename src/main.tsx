import { store } from '../src/redux/store.tsx'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

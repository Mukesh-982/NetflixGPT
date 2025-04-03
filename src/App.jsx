import React from 'react'
import AuthHandler from './Auth/AuthHandler'
import { Provider} from 'react-redux'
import store from './redux/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AuthHandler/>
      </Provider>
    </div>
  )
}

export default App

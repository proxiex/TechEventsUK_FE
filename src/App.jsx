import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import {
  HashRouter,
  Routes,
  Route, 
} from "react-router-dom";
import Events from './Page/Events';

import 'antd/dist/antd.less';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Routes>
              <Route exact path="/" element={ <Events /> } />
          </Routes>
      </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
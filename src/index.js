import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
// import reducer from './reducers/ticket-list-reducer';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";

// const store = createStore(reducer);
const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState() + " indexJS store.subscribe")
)

const rrfProps = {
  firebase,
  config: {
        userProfile: "users"
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();


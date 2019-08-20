import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules/";

import { persistStore, persistReducer } from "redux-persist";
// import immutableTransform from "redux-persist-transform-immutable";
import { Alert } from 'react-native';


import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
//import { AsyncStorage } from 'react-native';

const sagaMiddleware = createSagaMiddleware({
  onError: (err: Error, sagaStack) => {
    console.log("sagaError");
    console.log(err);
    console.log(sagaStack);

    //alert(`[Saga Error]: ${err.message}`);

    const buttons = [
      { text: 'OK', onPress: () => { } },
      { text: 'restart sagas', onPress: () => sagaMiddleware.run(rootSaga) },
    ];
    Alert.alert(
      `${err.name}`, `${err.message}`, buttons, { cancelable: true }
    );
  }
});

const middleware = [ sagaMiddleware ];

/*
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger({
    level: {
      prevState: false,
      nextState: false
    }
  }));
}
*/

const persistConfig = {
  //  transforms: [ immutableTransform() ],
  key: "root",
  storage,
  //blacklist: [ 'contents' ],
  blacklist: [ 'downloader' ],
  debug: false
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose || compose;

export function configureStore() {
  const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}

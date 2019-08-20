import React from "react";
// import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { Platform } from "react-native";
import { PersistGate } from 'redux-persist/integration/react';

import Routes from "./ui/Routes";
import { defaultNavigationService } from "./modules/NavigationService";
import { configureStore } from "./configureStore";
import * as ApplicationModule from "./modules/ApplicationModule";
import { AppState } from 'react-native';
import { Persistor } from "redux-persist";
import { Alert } from 'react-native';

// console.log(Platform.OS);

let _persistor: Persistor;

// 致命的エラーをログに残す
function error_handler(err: Error) {
  console.log("event:uncaughtException");
  console.log(err);
  console.log(err.stack);

  //alert(`[Main Process Error]: ${err.message}`);
  const buttons = [
    { text: 'OK', onPress: () => { } },
  ];
  if (_persistor) {
    buttons.push({ text: 'persistor.purge()', onPress: () => _persistor.purge() });
  }
  Alert.alert(
    `${err.name}`, `${err.message}`, buttons, { cancelable: true }
  );
}
if (Platform.OS === "web") {
  process.on("uncaughtException", error_handler);
} else {
  ErrorUtils.setGlobalHandler(error_handler);
}

const { store, persistor } = configureStore();
_persistor = persistor;
//persistor.purge();

export default class App extends React.Component {
  private didLaunch = false;
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    if (!this.didLaunch) {
      this.didLaunch = true;
      store.dispatch(ApplicationModule.actions.INITIALIZE());
    }
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
      //console.log('App has come to the background!');
      //persistor.flush();
      //persistor.persist();
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes ref={nav => defaultNavigationService.setNavigator(nav)} />
        </PersistGate>
      </Provider>
    );
  }
}

/*
<View style={{ flex: 1 }}>
  <Routes ref={nav => defaultNavigationService.setNavigator(nav)} />
  <FlashMessage position="top" animated={true} />
</View>
*/
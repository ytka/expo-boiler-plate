import { NavigationContainerComponent } from "react-navigation";
import { NavigationActions } from "react-navigation";

class NavigationService {
  private navigator: NavigationContainerComponent;
  setNavigator(nav: NavigationContainerComponent) {
    if (nav) {
      this.navigator = nav;
    }
  }
  navigate(routeName, params = {}) {
    if (this.navigator && routeName) {
      let action = NavigationActions.navigate({ routeName, params });
      this.navigator.dispatch(action);
    }
  }
  goBack() {
    if (this.navigator) {
      let action = NavigationActions.back({});
      this.navigator.dispatch(action);
    }
  }
}

export const defaultNavigationService = new NavigationService();

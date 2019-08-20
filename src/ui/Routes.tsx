import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import SampleListScreen from "./screens/SampleListScreen";


export default createAppContainer(
  createStackNavigator(
    {
      Main: SampleListScreen
    }));

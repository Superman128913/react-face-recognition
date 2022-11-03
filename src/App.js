import HomeScreen from "./screens/HomeScreen";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import FaceRecognition from "./screens/FaceRecognition";
import AvatarScreen from "./screens/AvatarScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
function App() {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="App">
      <Router>
        {userInfo ? (
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/faceRecognition" component={FaceRecognition} />
            <Route path="/avatar" component={AvatarScreen} />
            <Route path="/favorites" component={FavoriteScreen} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={RegisterScreen} exact />
            <Route path="/faceRecognition" component={FaceRecognition} />
            <Route path="/avatar" component={AvatarScreen} />
            <Route path="/favorites" component={FavoriteScreen} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;

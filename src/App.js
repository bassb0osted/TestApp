import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {Home}/>
          <Route path = '/calculator' component = {Calculator}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

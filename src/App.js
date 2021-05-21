import { Button } from 'antd';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import answer from './pages/answer/index';
import question from './pages/questions/index';




function App() {
  return (
 <Router>
      <Switch>
        <Route path="/home" component={question} />
        <Route path="/answer" component={answer} />
      </Switch>
    </Router>
  );
}

export default App;

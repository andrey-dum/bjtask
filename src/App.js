import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import AddForm from './components/AddForm';
import Login from './components/Login';
import NavbarApp from './components/NavbarApp';
import AuthRoute from './utils/AuthRoute';
import TaskList from './components/TaskList';
import { useActions } from './hooks/useActions';
import Container from '@material-ui/core/Container';
import PositionedSnackbar from './components/PositionedSnackbar';




function App() {
  const {autoLogin} = useActions()

  useEffect(() => {
      autoLogin()
  }, [])


  return (
    <Router>
      <div className="app">
        <NavbarApp />
        <Container maxWidth="sm">
          <Switch>
            <Route path="/add"  component={AddForm} />
            <AuthRoute path="/login" component={Login} />
            <Route path="/"  component={TaskList} />
          </Switch>
          <PositionedSnackbar />
        </Container>
      </div>
    </Router>
  );
}

export default App;

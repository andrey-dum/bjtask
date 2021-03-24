import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";
import { useActions } from '../hooks/useActions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 25
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavbarApp() {
  const classes = useStyles();
  const { logout } = useActions()

  const state = useSelector(state => state.auth)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
            {/* <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/add">add</Link> */}
          <Button component={Link} to="/" color="inherit">Home</Button>
          {state.isAuth
            ? <Button onClick={logout} color="inherit">Logout</Button>
            : <Button component={Link} to="/login" color="inherit">Login</Button>
          }
          <Button component={Link} to="/add" color="inherit">Add</Button>
        </Toolbar>
      </AppBar>

    </div>
  );
}

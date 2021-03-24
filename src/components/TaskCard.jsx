import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useActions } from '../hooks/useActions';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import { useHistory } from 'react-router-dom'

const status = {
  0: 'задача не выполнена',
  1: 'задача не выполнена, отредактирована админом',
  10: 'задача выполнена',
  11: 'задача отредактирована админом и выполнена',
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    marginBottom: 25
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TaskCard({task}) {
  const history = useHistory()
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(task.text);
  const [check, setCheck] = useState(task.status === 10 || task.status === 11);
  const { update, logout } = useActions()
  const {token} = useSelector(state => state.auth)

  const editToggle = () => {
    setEdit(!edit)
  }

  const notChanged = (check === (task.status === 10 || task.status === 11)) && value === task.text

  const onUpdateTask = () => {
    const token = localStorage.getItem('token')

    const data = {
      id: task.id,
      text: value,
      status: task.status
    }

    if(!check) {
      data.status = 0
    }
    if(!check && value !== task.text) {
      data.status = 1
    }

    if (check) {
      data.status = 10
    }
    if (check && value !== task.text) {
      data.status = 11
    }

    if(!token) {
      logout()
      history.push('/login')
    } else {
      update(data)
    }

  }


  return (
    <Card className={classes.root}>
      {!edit
        ?
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {task.email}
          </Typography>
          <Typography variant="h5" component="h2">
            {task.username}
          </Typography>
          <Typography className={classes.pos}>
              {task.text}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
              Статус: { status[task.status] }
          </Typography>
        </CardContent>

        : <CardContent className={classes.cardContent}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {task.email}
            </Typography>
            <Typography variant="h5" component="h2">
              {task.username}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            <input
                name="username"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            </Typography>

            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={check}
              onChange={(event) => setCheck(event.target.checked)}
            />

              <Button
                variant="contained"
                color="primary"
                onClick={onUpdateTask}
                disabled={notChanged}
                // disabled={(check === (task.status === 10 || task.status === 11)) && value === task.text}
              >
                Изменить
              </Button>
            </CardContent>
      }

        {task.status === 10 || task.status === 11 ? <CheckCircleOutlineIcon style={{ fontSize: 50, color: '#7ad87a' }} /> : <CheckCircleOutlineIcon style={{ fontSize: 50, color: '#ccc' }} /> }

       { token &&  (
         !edit
          ? <IconButton
              onClick={editToggle}
              aria-label="editToggle"
              className={classes.margin}
            >
              <EditIcon fontSize="large" />
            </IconButton>
        :
        <IconButton
          onClick={editToggle}
          aria-label="CloseIcon"
          className={classes.margin}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
       )}
    </Card>
  );
}




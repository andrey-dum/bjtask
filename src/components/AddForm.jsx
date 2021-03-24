import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import useInput from '../hooks/useInput'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',

  },
}));



function AddForm() {
  const classes = useStyles();
  const history = useHistory()

  const {error} = useSelector(state => state.tasks)
  const [checked, setChecked] = React.useState(false)
  const { createTask } = useActions()

  const username = useInput('')
  const email = useInput('')
  const text = useInput('')


  const create = () => {
    const data = {
      username: username.value,
      email: email.value,
      text: text.value,
      status: checked ? 10 : 0
    }
    createTask(data, history)
  }

  return (
      <div className={classes.root}>
        <TextField
          {...username}
          id="username"
          label="Username"
          style={{ margin: 8 }}
          placeholder="Username"
          helperText="Full Username!"
          fullWidth
          margin="normal"
        />
        <div className="error">{error && error.username}</div>

        <TextField
          {...email}
          id="email"
          label="Email"
          style={{ margin: 8 }}
          placeholder="Email"
          helperText="Email!"
          fullWidth
          margin="normal"
        />
        <div  className="error">{error && error.email}</div>
        <TextField
          {...text}
          id="text"
          label="Text"
          style={{ margin: 8 }}
          placeholder="Text"
          helperText="Full Text!"
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          style={{ margin: 8 }}
          control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} name="status" />}
          label="Статус"
        />
        <Button
          style={{ margin: 8 }}
          variant="contained"
          color="primary"
          onClick={create}
          // disabled={!username.value || !email.value || !text.value}
        >Создать
        </Button>
    </div>
  )
}

export default AddForm

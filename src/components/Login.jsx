import { useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { useActions } from '../hooks/useActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Login() {
  const { login } = useActions()
  const auth = useSelector(state => state.auth)

  const username = useInput('')
  const password = useInput('')

  const onLogin = () => {
    login(username.value, password.value)
  }

  return (
    <div >
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
      <div className="error">{auth.error && auth.error.username }</div>
     <TextField
        {...password}
        id="password"
        type="password"
        label="password"
        style={{ margin: 8 }}
        placeholder="password"
        helperText="Enter password!"
        fullWidth
        margin="normal"
      />
      <div className="error">{auth.error && auth.error.password }</div>
      <Button
          style={{ margin: 8 }}
          variant="contained"
          color="primary"
          onClick={onLogin}
          // disabled={!username.value || !email.value || !text.value}
          >
          Войти
        </Button>
  </div>
  )
}

export default Login

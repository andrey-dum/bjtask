import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import { useActions } from '../hooks/useActions';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SortSelector() {
  const classes = useStyles();

  const { setSortField, setSortDirection } = useActions()

  const {sort_direction, sort_field} = useSelector(state => state.tasks)
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSortField(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Сортировать</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sort_field}
              onChange={handleChange}
            >
              <MenuItem value={'id'}>Id</MenuItem>
              <MenuItem value={'username'}>Username</MenuItem>
              <MenuItem value={'email'}>Email</MenuItem>
              <MenuItem value={'status'}>Status</MenuItem>
            </Select>
          </FormControl>

            <div
                style={{display: 'flex', alignItems: 'center'}}
                onClick={() => setSortDirection(sort_direction === "asc" ? 'desc' : 'asc')}>
                Порядок {sort_direction === 'desc' ? <ArrowUp /> : <ArrowDown />}
            </div>


        </div>

    </div>
  );
}
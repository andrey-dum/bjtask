import React from 'react';
import {useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar() {
  const {alert} = useSelector(state => state.tasks)
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!alert}
        message={alert?.text}
      />
    </div>
  );
}
import React from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

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



function Pagination() {
  const classes = useStyles();
  let [portionNumber, setPortionNumber] = React.useState(1);

  const { changePage } = useActions()
  const {page, total_task_count, pageLimit} = useSelector(state => state.tasks)

  const pagesCount = Math.ceil(total_task_count / pageLimit);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionSize = 5

  let portionCount = Math.ceil(pagesCount / portionSize);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;


  if(pagesCount <= 1) {
    return null
  }


  return (
    <div className="pagination">
      {portionNumber > 1 &&
         <IconButton
              onClick={() => {setPortionNumber(portionNumber - 1)}}
              aria-label="CloseIcon"
              className={classes.margin}>
            <ArrowBackIcon fontSize="medium" />
        </IconButton>
        }

        {pages
          .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((p) => (
            <span
              key={p}
              onClick={() => changePage(p)}
              className={page === p ? "active" : ""}
            >
              {p}
            </span>
        ))}
        {portionCount > portionNumber &&
         <IconButton
              onClick={() => {setPortionNumber(portionNumber + 1)}}
              aria-label="CloseIcon"
              className={classes.margin}
              >
            <ArrowForwardIcon fontSize="medium" />
        </IconButton>
      }
    </div>
  )
}

export default Pagination

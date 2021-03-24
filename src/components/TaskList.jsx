import React from 'react'
import { useEffect } from 'react'
import {
  useSelector
} from 'react-redux'
import TaskCard from '../components/TaskCard';
import { useActions } from '../hooks/useActions';
import Loader from './Loader';
import Pagination from './Pagination';
import SortSelector from './SortSelector';


function TaskList() {

  const { fetchTasks } = useActions()
  const {page, loading, tasks, sort_direction, sort_field } = useSelector(state => state.tasks)

  useEffect(() => {
    fetchTasks({page, sort_field, sort_direction})
  }, [sort_field, sort_direction, page])


  return (
    <div>
      <SortSelector />
      <Pagination />
      { loading
        ? <Loader />
        : tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
      )) }

    </div>
  )
}

export default TaskList

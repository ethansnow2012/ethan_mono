// src/components/TodoItem.tsx
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../store/todosSlice';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <div className='flex gap-2'>
      <span
        style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer' }}
        onClick={() => dispatch(toggleTodo(id))}
      >
        {text}
      </span>
      <button className='bg-orange-400' onClick={() => dispatch(removeTodo(id))}>Remove</button>
    </div>
  );
};

export default TodoItem;
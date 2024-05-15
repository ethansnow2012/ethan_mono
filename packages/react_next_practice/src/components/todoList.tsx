// src/components/TodoList.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TodoItem from './todoItem';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <div className='flex flex-col gap-2'>
            {todos.map((todo: Todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
            ))}
        </div>
    );
};

export default TodoList;
import TodoList from '@/components/todoList';
import TodoInput from '@/components/todoInput';

export default function TodoInner() {
    return (
      <div className='flex flex-col gap-2'>
        <h1>Todo List</h1>
        <TodoInput />
        <TodoList />
      </div>
    );
  }
  
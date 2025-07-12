import { useRef, useEffect } from 'react';

type Props = {
  handleEmptyTitle: (message: string) => void;
  handleNewTitle: (newTitle: string) => void;
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
};

export const Header: React.FC<Props> = ({
  handleEmptyTitle,
  handleNewTitle,
  isLoading,
  input,
  onInputChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTitle = input?.toString().trim();

    if (!newTitle) {
      handleEmptyTitle('Title should not be empty');

      return;
    }

    handleNewTitle(newTitle);
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => onInputChange(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // This automatically extends the matchers
import App from './App';

test('renders App component', () => {
  render(<App />);
  const header = screen.getByText('My Todolist');
  expect(header).toBeInTheDocument();
  /*
  The error TypeError: Cannot convert undefined or null to object indicates that the matchers import 
  might not be working as expected. Since @testing-library/jest-dom automatically extends Jest's matchers,
   you don't need to manually extend the matchers.
  */
});

test('add and clear todo', () => {
    render(<App />);
  
    // Add a todo
    const desc = screen.getByPlaceholderText('Description');
    fireEvent.change(desc, { target: { value: 'Go to coffee' } });
    const date = screen.getByPlaceholderText('Date');
    fireEvent.change(date, { target: { value: '29.12.2023' } });
    const status = screen.getByPlaceholderText('Status');
    fireEvent.change(status, { target: { value: 'Open' } });
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
  
    // Verify the todo was added
    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('Go to coffee');
  
    // Clear todos
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
  
    // Verify the table is empty
    expect(table).not.toHaveTextContent('Go to coffee');
  });
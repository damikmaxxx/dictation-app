import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('allows user to type text', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('renders as password input when Input.Password is used', () => {
    render(<Input.Password placeholder="Secret" />);
    const input = screen.getByPlaceholderText('Secret');
    
    expect(input).toHaveAttribute('type', 'password');
  });
});
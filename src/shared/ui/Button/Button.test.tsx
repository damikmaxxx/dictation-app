
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children text correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup(); 
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    await user.click(screen.getByText('Click Me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is provided', () => {
    render(<Button disabled>Disabled</Button>);
    
    const btn = screen.getByText('Disabled');
    expect(btn.closest('button')).toBeDisabled();
  });
});
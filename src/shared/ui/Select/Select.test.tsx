import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
    { value: 'ru', label: 'Russian' },
    { value: 'en', label: 'English' },
];

describe('Select Component', () => {
    it('renders with placeholder', () => {
        render(<Select placeholder="Choose language" options={options} />);
        expect(screen.getByText('Choose language')).toBeInTheDocument();
    });

    it('opens dropdown and selects an option', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(
            <Select
                options={options}
                onChange={handleChange}
                placeholder="Select me"
            />
        );

        const selectBox = screen.getByRole('combobox');
        fireEvent.mouseDown(selectBox);
        const option = await screen.findByText('Russian');
        await user.click(option);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('ru', expect.anything());

        const selectedItems = screen.getAllByTitle('Russian');

        expect(selectedItems.length).toBeGreaterThan(0);
        expect(selectedItems[0]).toBeInTheDocument();
    });

    it('renders as disabled', () => {
        render(<Select disabled options={options} />);
        const selectBox = screen.getByRole('combobox');
        expect(selectBox).toBeDisabled();
    });
});
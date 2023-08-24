import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders Home page header', () => {
  render(<Home />);
  const pageHeader = screen.getByText(/Player Setup/i);
  expect(pageHeader).toBeInTheDocument();
});

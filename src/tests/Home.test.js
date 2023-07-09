import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders Home page header', () => {
  render(<Home />);
  const linkElement = screen.getByText(/home placeholder/i);
  expect(linkElement).toBeInTheDocument();
});

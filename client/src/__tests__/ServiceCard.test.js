import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ServiceCard from '../components/ServiceCard';

test('renders service title and description', () => {
  const service = {
    title: 'Web Development',
    description: 'Building responsive and modern web applications.',
    icon: '/assets/images/webdev.png'
  };

  render(
    <ServiceCard
      service={service}
      isAdmin={false}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText('Web Development')).toBeInTheDocument();
  expect(screen.getByText('Building responsive and modern web applications.')).toBeInTheDocument();
  expect(screen.getByAltText('Web Development')).toBeInTheDocument();
});
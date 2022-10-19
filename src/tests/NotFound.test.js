import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const frase = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(frase).toBeInTheDocument();
  });

  it('Teste se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

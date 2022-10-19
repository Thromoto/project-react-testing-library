import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    screen.logTestingPlaygroundURL();
    const msgTela = screen.getByText(/no favorite pokemon found/i);
    expect(msgTela).toBeInTheDocument();
  });
});

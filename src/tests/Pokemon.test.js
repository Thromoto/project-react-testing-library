import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemonSite = '/pokemons/25';

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnEletric);

    const nome = screen.getByText(/pikachu/i);
    expect(nome).toBeInTheDocument();

    const tipo = screen.getByTestId('pokemon-type');
    expect(tipo).toHaveTextContent(/electric/i);

    const peso = screen.getByText(/average weight: 6\.0 kg/i);
    expect(peso).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const imgText = screen.getByAltText(/pikachu sprite/i);
    expect(imgText).toBeInTheDocument();
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<App />);
    const btnEletric = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnEletric);
    const nome = screen.getByText(/pikachu/i);
    expect(nome).toBeInTheDocument();
    const info = screen.getByRole('link', { name: /more details/i });
    expect(info).toHaveAttribute('href', pokemonSite);
  });

  it('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnEletric);

    const info = screen.getByRole('link', { name: /more details/i });
    expect(info).toHaveAttribute('href', pokemonSite);
    userEvent.click(info);

    const { pathname } = history.location;
    expect(pathname).toBe(pokemonSite);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const btnEletric = screen.getByRole('button', { name: /electric/i });
    userEvent.click(btnEletric);

    const info = screen.getByRole('link', { name: /more details/i });
    expect(info).toHaveAttribute('href', pokemonSite);
    userEvent.click(info);

    const { pathname } = history.location;
    expect(pathname).toBe(pokemonSite);
    const clkFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(clkFav);
    const pokFav = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(pokFav).toBeInTheDocument();
    const pokemonFav = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(pokemonFav).toHaveAttribute('src', '/star-icon.svg');
  });
});

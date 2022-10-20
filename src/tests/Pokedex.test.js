import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const possuiHeading = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(possuiHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nomeBtn = screen.getByText(/próximo pokémon/i);
    expect(nomeBtn).toBeInTheDocument();
  });

  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const allNome = screen.getByText(/all/i);
    expect(btnAll).toBeInTheDocument();
    expect(allNome).toBeInTheDocument();
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilter).toHaveLength(7);
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByText(/próximo pokémon/i);
    expect(btnProximo).toBeInTheDocument();
    userEvent.click(btnProximo);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    const pokemonsSemFiltro = screen.getByText(/pikachu/i);
    expect(pokemonsSemFiltro).toBeInTheDocument();
  });

  it('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    const tipoBtn = screen.getByRole('button', { name: /psychic/i });
    expect(tipoBtn).toBeInTheDocument();
    userEvent.click(tipoBtn);
    const tipoPokemon = screen.getByText('Alakazam');
    expect(tipoPokemon).toBeInTheDocument();
  });
});

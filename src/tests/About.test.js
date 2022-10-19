import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const contemParagrafo1 = screen.getByText(/one can filter pokémons by type, and see more details for each one of them/i);
    expect(contemParagrafo1).toBeInTheDocument();
    const contemParagrafo2 = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémons/i);
    expect(contemParagrafo2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const verificaImg = screen.getByRole('img', { name: /pokédex/i });
    expect(verificaImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

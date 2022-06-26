import { writable } from 'svelte/store';

export const pokemons = writable([]);

const getPokemons = async () => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data, index) => {
		return {
			name: data.name,
			id: index + 1,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				index + 1
			}.png`
		};
	});
	pokemons.set(loadedPokemon);
};
getPokemons();

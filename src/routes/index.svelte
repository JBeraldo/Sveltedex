<script context="module">
	export async function load({ params }) {
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
        return {props: {pokemons:loadedPokemon}}
	}
</script>

<script>
	import PokemanCard from '../components/pokemanCard.svelte';
	export let pokemons;
	let searchTerm = '';
	let filteredPokemons = [];

	$: {
		if (searchTerm) {
			filteredPokemons = pokemons.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			);
		} else {
			filteredPokemons = [...pokemons];
		}
	}
</script>

<svelte:head>
	<title>Sveltedex</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Sveltedex</h1>

<input
	bind:value={searchTerm}
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	type="text"
	placeholder="Digite o nome do pokemon..."
/>

<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemons as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>

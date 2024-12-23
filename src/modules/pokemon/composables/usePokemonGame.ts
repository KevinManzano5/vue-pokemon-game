import { computed, onMounted, ref } from 'vue';
import confetti from 'canvas-confetti';

import { GameStatus } from '../enum';
import { pokemonApi } from '../api/pokemonApi';
import type { Pokemon, PokemonListResponse } from '../interfaces';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(
    () => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)],
  );
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemons: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');

      const id = urlParts[urlParts.length - 2] ?? 0;

      return {
        id: +id,
        name: pokemon.name,
      };
    });

    return pokemons.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;

    pokemonOptions.value = pokemons.value.slice(0, howMany);

    pokemons.value = pokemons.value.slice(0, howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;

      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });

      return;
    }

    gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();

    getNextRound();
  });

  return {
    checkAnswer,
    isLoading,
    gameStatus,
    pokemonOptions,
    getNextRound,
    randomPokemon,
  };
};

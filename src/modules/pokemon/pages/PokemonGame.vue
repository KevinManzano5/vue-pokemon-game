<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokemon?</h1>

    <div v-if="gameStatus !== GameStatus.Playing" class="h-20">
      <button
        @click="getNextRound()"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Jugar de nuevo
      </button>
    </div>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <PokemonOptions
      :correct-answer="randomPokemon.id"
      :pokemon-options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../enum';

const { checkAnswer, gameStatus, randomPokemon, isLoading, pokemonOptions, getNextRound } =
  usePokemonGame();
</script>

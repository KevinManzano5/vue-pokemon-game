<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ id, name } in pokemonOptions"
      @click="emit('selectedOption', id)"
      :key="id"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id !== correctAnswer && blockSelection,
        },
      ]"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Pokemon } from '../interfaces';

interface Props {
  blockSelection: boolean;
  correctAnswer: number;
  pokemonOptions: Pokemon[];
}

const { blockSelection, correctAnswer, pokemonOptions } = defineProps<Props>();

const emit = defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}
</style>

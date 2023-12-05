<template>
  <div>
    <h1>Playground</h1>
    <p>Playground</p>
    <NuxtLink to="/second">
      to second page
    </NuxtLink>

    <p>random number: {{ data }}</p>

    <button @click="() => refresh()">
      refresh
    </button>
  </div>
</template>


<script setup lang="ts">
import { useFetch } from '#imports'
const { data, refresh } = await useFetch('/api/random-number')
</script>
<template>
  <div>
    <h1>Playground</h1>
    <p>Playground</p>
    <NuxtLink to="/second">
      to second page
    </NuxtLink>

    {{ $route.params }}
  </div>
</template>


<script setup lang="ts">
import { useFetch } from '#imports'

await useFetch('/api/random-number')
</script>
<template>
  <div>
    <h1>Second Page</h1> 
    <NuxtLink to="/">
      to index page
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
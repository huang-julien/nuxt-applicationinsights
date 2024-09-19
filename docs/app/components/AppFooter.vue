<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      Created and maintained by <ULink
        href="https://github.com/huang-julien"
        target="_blank"
      >
        Julien Huang
      </ULink>
    </template>
  </UFooter>
</template>

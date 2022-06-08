<script setup lang="ts">
import { onMounted } from "vue";
import { createOasis } from "./oasis";

onMounted(() => {
  createOasis();
})
</script>

<template>
	<canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>


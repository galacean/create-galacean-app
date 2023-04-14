<script setup lang="ts">
import { onMounted } from "vue";
import { createRuntime } from "./runtime";

onMounted(() => {
  createRuntime();
})
</script>

<template>
	<canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>


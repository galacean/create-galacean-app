<script setup lang="ts">
import { onMounted } from "vue";
import { createRuntime } from "./runtime";

onMounted(() => {
  createRuntime();
})
</script>

<template>
	<canvas id="canvas" />
</template>

<style>
#canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>

<template>
	<canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createOasis } from "./oasis";

export default defineComponent({
	name: "App",
	components: {},
	mounted: () => {
		createOasis();
	},
});
</script>

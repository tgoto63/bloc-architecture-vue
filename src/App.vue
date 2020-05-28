<template>
  <Counter />
</template>

<script lang="ts">
import Counter from "./components/Counter.vue";
import { CounterBloc } from "@/counter-bloc";

export default {
  components: { Counter },
  provide: {
    bloc: new CounterBloc()
  }
};
</script>

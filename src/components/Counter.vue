<template>
  <div>
    <button @click="handleCount('increment', 1)">+1</button>
    <button @click="handleCount('decrement', 1)">-1</button>
    <button @click="handleCount('async-increment', 2)">+2(Async)</button>
    <button @click="handleCount('async-decrement', 3)">-3(Async)</button>
    <pre v-text="JSON.stringify(state, null, 2)" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { CounterBloc, CounterState } from "@/counter-bloc";

@Component
export default class Counter extends Vue {
  @Inject()
  readonly bloc!: CounterBloc;

  private state: CounterState = {} as CounterState;

  created() {
    // Dart の Stream#listen を想定
    this.bloc.stream.subscribe(value => {
      this.state = value;
    });
  }

  handleCount(
    type: "increment" | "decrement" | "async-increment" | "async-decrement",
    count: number
  ) {
    // Dart の Sink#add を想定
    this.bloc.sink({ type: type, count: count });
  }
}
</script>

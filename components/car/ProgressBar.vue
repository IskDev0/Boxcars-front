<script setup lang="ts">

const props = defineProps<{
  progress: number;
  overall: number
}>();

const progress = computed(() => Math.min(100, Math.max(0, props.progress)));
</script>

<template>
  <div class="circular-progress">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path
          class="circle-bg"
          d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
          class="circle"
          :stroke-dasharray="`${progress}, 100`"
          d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{{ overall }}</text>
    </svg>
  </div>
</template>

<style scoped>
.circular-progress {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 2;
}

.circle {
  fill: none;
  stroke-width: 2;
  stroke: #405FF2;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease 0s;
}

.percentage {
  fill: #405FF2;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>

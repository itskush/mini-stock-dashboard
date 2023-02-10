<script setup>
import ChartData from './components/ChartData.vue';
import NavMenu from './components/NavMenu.vue';
</script>

<template>
  <div class="container is-fluid">
    <NavMenu />
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <ChartData />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 1em;
}

.container.my-fluid-container {
  max-width: none !important;
  width: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

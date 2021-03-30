<template>
    <div :class="`side_bar${present ? ' side_bar--show' : ''}`">
        <slot />
    </div>
</template>
<script>
export default {
  props: [
    'present'
  ]
}
</script>
<style lang="scss">
@import "../../css/abstract/mixins";

.side_bar {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: .5s transform cubic-bezier(.44, .86, .72, .76);
  z-index: 4;

  &--show {
    transform: translateX(0);
  }   
}
</style>

<template>
    <button>
      <span v-if="isLike">Like</span>
      <span v-if="!isLike">Dislike</span>
    </button>
</template>
<script>
export default {
  props: [
    'isLike'
  ]
}
</script>
<style lang="scss">

</style>

<template>
<header class="hero" :style="{
    background: `center / cover no-repeat url(${image})`
  }">
  <div class="hero__nav">
    <nav-hero :hide-side-bar="hideSideNavBar"></nav-hero>
  </div>
  <div class="hero__poll">
    <poll-box
        :poll-item="pollItem"
        :poll-question="pollQuestion"></poll-box>
  </div>
  <div class="hero__deadline">
    <span class="hero__deadline_text">closing in</span>
    <div class="hero__deadline_value">
      <div class="hero__deadline_limit">
        <span class="hero__deadline_days">{{pollDeadline}}</span> days
      </div>
    </div>
  </div>
</header>
</template>
<script>
import NavHero from './NavHero.vue';
import PollBox from './PollBox.vue';
import { MID_BREAKPOINT } from '../../constants';

export default {
  data() {
    return {
      hideSideNavBar: false
    }
  },
  props: [
    'pollItem',
    'pollQuestion',
    'pollDeadline',
    'image'
  ],
  components: {
    'nav-hero': NavHero,
    'poll-box': PollBox
  },
  mounted() {
    this.$nextTick(() => {
      const mql = window.matchMedia(`(min-width: ${MID_BREAKPOINT}px)`);

      window.addEventListener('resize', this.validateBreakpoint);
      this.hideSideNavBar = mql.matches;
    });
  },
  methods: {
    validateBreakpoint() {
      console.log(MID_BREAKPOINT, window.innerWidth);
      this.hideSideNavBar = window.innerWidth >= MID_BREAKPOINT;
    }
  }
}
</script>
<style lang="scss">
@import "../../css/abstract/mixins";

.hero {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  
  @include breakpoint($mid-viewport) {
    grid-template-columns: repeat(12, 1fr);
  }

  &__nav {
    grid-column: 1 / span 6;

    @include breakpoint($mid-viewport) {
      grid-column: 1 / span 12;
    }
  }

  &__poll {
    grid-column: 2 / span 4;

    @include breakpoint($mid-viewport) {
      grid-column: 2 / span 5;
    }
  }

  &__deadline {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column: 1 / span 6;
    height: 40px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(height, 40px);
      grid-template-columns: repeat(12, 1fr);
      grid-column: 1 / span 12;
    }

    &_text {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      grid-column: 1 / span 2;
      background-color: rgba(112, 112, 112, 0.3);
      text-transform: uppercase;
      color: #ffffff;
      padding-right: 12px;
      font-size: 1.2rem;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(padding-right, 12px);
        grid-column: 1 / span 2;
      }
    }

    &_limit {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 1.8rem;
    }

    &_value {
      position: relative;
      padding-left: 6px;
      grid-column: 3 / span 6;
      background-color: rgba(255, 255, 255, 0.7);
      color: #464646;


      @include breakpoint($mid-viewport) {
        @include calc-dimension(padding-left, 6px);
        grid-column: 3 / span 11;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 0; 
        height: calc(50% - 6px);
        transform: translate(-100%, 0);
        border-top: 0;
        border-bottom: 6px solid transparent;
        border-right: 6px solid rgba(255, 255, 255, 0.8);

        @include breakpoint($mid-viewport) {
          @include calc-dimension(border-bottom-radius, 6px);
          @include calc-dimension(border-right-radius, 6px);
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0; 
        height: calc(50% - 6px);
        transform: translateX(-100%);
        border-top: 6px solid transparent;
        border-bottom: 0;
        border-right: 6px solid rgba(255, 255, 255, 0.8);

        @include breakpoint($mid-viewport) {
          @include calc-dimension(border-top-radius, 6px);
          @include calc-dimension(border-right-radius, 6px);
        }
      }
    }

    &_days {
      display: inline-block;
      padding-right: 5px;
      font-size: 2.2rem;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(padding-right, 5px);
      }
    }
  }
}
</style>
<template>
  <nav class="nav_hero">
    <button v-if="!hideSideBar" class="nav_hero__btn" :class="{'nav_hero__btn--nav_active': showNav}" @click="toggleNav">
      <span class="nav_hero__btn_icon"></span>
      <span class="nav_hero__btn_icon"></span>
      <span class="nav_hero__btn_icon"></span>
    </button>
    <h1 class="nav_hero__title">Rule of Thumb</h1>
    <side-bar
      v-if="!hideSideBar"
      :present="showNav">
    <ul class="nav_hero__links nav_hero__links--side-bar">
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">Past Trials</a>
      </li>
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">How It Works</a>
      </li>
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">Log In/Sign Up</a>
      </li>
    </ul>
    </side-bar>
    <ul class="nav_hero__links" v-if="hideSideBar">
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">Past Trials</a>
      </li>
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">How It Works</a>
      </li>
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link">Log In/Sign Up</a>
      </li>
      <li class="nav_hero__item">
          <a href="#" class="nav_hero__link"><font-awesome-icon icon="search"></font-awesome-icon></a>
      </li>
    </ul>
  </nav>
</template>
<script>
import SideBar from '../ui/SideBar.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);


export default {
  data() {
    return {
      showNav: false
    };
  },
  props: [
    'hideSideBar'
  ],
  components: {
    'side-bar': SideBar,
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    }
  }
}
</script>
<style lang="scss">
@import "../../css/abstract/mixins";

.nav_hero {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px 10px;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(18, 18, 18, 0.8) 100%);
  color: #ffffff;

  @include breakpoint($mid-viewport) {
    @include calc-dimension(padding, 20px);
    padding-left: 0;
    padding-right: 0;
    grid-template-columns: repeat(12, 1fr);
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(18, 18, 18, 0.6) 100%);
  }

  &__btn {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    width: 30px;
    height: 25px;
    border: 0;
    padding: 0;
    z-index: 5;

    &_icon {
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      transition: .35s all cubic-bezier(.44, .86, .72, .76);

      &:nth-of-type(1) {
        top: 0;
      }

      &:nth-of-type(2) {
        top: 50%;
      }

      &:nth-of-type(3) {
        top: 100%;
      }
    }

    &.nav_hero__btn--nav_active .nav_hero__btn_icon {
      &:nth-of-type(1) {
        transform: rotate(45deg);
        top: 50%;
      }

      &:nth-of-type(2) {
        transform: rotate(45deg);
        top: 50%;
      }

      &:nth-of-type(3) {
        transform: rotate(-45deg);
        top: 50%;
      }
    }
  }

  &__links {
    display: flex;
    justify-content: center;
    flex-direction: column;
    grid-column: 1 / span 6;
    padding: 0;
    margin: 0;

    &--side-bar {
      justify-content: flex-start;
      
      height: 100%;
      padding-top: 100px;
      color: #ffffff;
      background-color: rgb(18, 18, 18);

      .nav_hero__link {
        display: inline-block;
        padding: 25px;
        font-size: 2.4rem;
      }
    }

    @include breakpoint($mid-viewport) {
      justify-content: flex-end;
      flex-direction: row;
      grid-column: 4 / span 8;
    }
  }

  &__link {
    text-decoration: none;
    color: #ffffff;
    font-size: 1.6rem;
    padding: 0 15px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding, 15px);
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  &__item {
    list-style: none;
    display: flex;
    align-items: center;
  }

  &__title {
    grid-column: 2 / span 6;
    margin: 0;
    font-family: 'RegularLato', 'sans-serif';
    font-size: 2rem;
    text-align: right;
    z-index: 5;

    @include breakpoint($mid-viewport) {
      grid-column: 2 / span 2;
      font-size: 3.2rem;
      text-align: left;
    }
  }
}
</style>


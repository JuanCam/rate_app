<template>
    <article class="card">
        <img class="card__image" :src="profile.image" alt=""/>
        <div class="card__info">
          <header class="card__header">
            <span class="card__rate" :class="{'card__rate--disapproval' : !approved, 'card__rate--approval' : approved}">
              <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
            </span>
              <h2 class="card__header_title">{{profile.name}}</h2>
              <div class="card__header_info">
                <small class="card__header_time" v-if="lengthInArea">{{profile.lengthInArea}}</small>
                <small class="card__header_legend" v-if="legend">{{profile.area}}</small>
              </div>
          </header>
          <div class="card__content">{{content}}</div>
          <slot />
        </div>
    </article>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp);

export default {
  
  props: [
    'profile',
    'content',
  ],
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  computed: {
    approved() {
      return this.profile.approval / (this.profile.approval + this.profile.disapproval) >= .5;
    }
  }
}
</script>
<style lang="scss">
@import "../css/abstract/mixins";

.card {
  position: relative;

  &__info {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(0deg, rgba(18, 18, 18, 0.8) 0%, rgba(255,255,255,0) 70%);
  }

  &__image {
    width: 100%;
  }
  
  &__content {
    color: #ffffff;
    font-size: 1.6rem;
    padding: 15px 35px;

    @include breakpoint($mid-viewport) {
        @include calc-dimension(padding, 15px);
        @include calc-dimension(padding-left, 35px);
        @include calc-dimension(padding-right, 35px);
    }
  }

  &__header {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 35px;
    color: #ffffff;

    @include breakpoint($mid-viewport) {
        @include calc-dimension(padding-left, 35px);
        @include calc-dimension(padding-right, 35px);
    }

    &_title {
      margin: 12px 0;
      font-size: 2.5rem;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(margin, 12px);
        margin-left: 0;
        margin-right: 0;
        font-size: 4.5rem;
      }
    }

    &_time {
      font-family: 'RegularLato', 'sans-serif';
      font-weight: bold;
      font-size: 1.2rem;
    }

    &_legend {
      font-size: 1.2rem;
      margin-left: 5px;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(margin-left, 5px);
      }
    }
  }

  &__rate {
    position: absolute;
    top: 25px;
    left: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    color: #ffffff;
    font-size: 1.2rem;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(width, 25px);
      @include calc-dimension(height, 25px);
      @include calc-dimension(top, 25px);
      @include calc-dimension(left, 5px);
    }

    &--disapproval {
      background-color: $orange-color;
      transform: rotateX(180deg) rotateY(180deg);
      animation: remove_approved .5s cubic-bezier(.44, .86, .72, .76);
    }

    &--approval {
      background-color: $blue-light-color;
      animation: turn_approved .5s cubic-bezier(.44, .86, .72, .76);
    }
  }
}

@include turn_approved;
@include remove_approved;

</style>

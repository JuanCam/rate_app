<template>
    <article class="poll_box">
        <div class="poll_box__content">
            <small class="poll_box__question">What's your opinion on</small>
            <p class="poll_box__item">{{pollItem}} ?</p>
            <p class="poll_box__description">{{pollQuestion}}</p>
            <p class="poll_box__description">What's your veredict?</p>
        </div>
        <div class="poll_box__btn_set">
            <a href="#" class="poll_box__btn poll_box__btn--like">
            <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
            </a>
            <a href="#" class="poll_box__btn poll_box__btn--dislike">
            <font-awesome-icon icon="thumbs-down"></font-awesome-icon>
            </a>
        </div>
    </article>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faThumbsDown);

export default {
  props: [
    'pollItem',
    'pollQuestion'
  ],
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  }
}
</script>
<style lang="scss">
@import "../../css/abstract/mixins";

.poll_box {
    color: #ffffff;
    padding: 50px 0 90px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding-top, 100px);
      @include calc-dimension(padding-bottom, 180px);
      padding: 100px 0 180px;
    }

    @include breakpoint($mid-viewport) {
      grid-template-columns: repeat(12, 1fr);      
    }

    &__btn {
      flex-grow: 1;
      padding: 10px 5px;
      text-align: center;
      font-size: 2.8rem;
      color: #ffffff;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(padding, 5px);
        @include calc-dimension(padding-top, 10px);
        @include calc-dimension(padding-bottom, 10px);
      }

      &--dislike {
        background-color: $orange-color;
        transform: rotateY(180deg);
      }

      &--like {
        background-color: $blue-light-color;
      }
    }

    &__item {
      margin: 5px 0;
      font-size: 3rem;
      font-family: 'RegularLato', 'sans-serif';

      @include breakpoint($mid-viewport) {
        @include calc-dimension(margin-top, 5px);
        @include calc-dimension(margin-bottom, 5px);
        font-size: 6rem;
      }
    }

    &__description {
      font-size: 1.6rem;

      @include breakpoint($mid-viewport) {
        font-size: 2.1rem;
      }
    }

    &__question {
      font-size: 1.6rem;
    }

    &__content {
      padding: 25px;
      background-color: rgba(8, 8, 8, 0.5);
      backdrop-filter: blur(6px);

      @include breakpoint($mid-viewport) {
        @include calc-dimension(padding, 25px);
      }
    }

    &__btn_set {
      display: flex;
      opacity: .85;
    }
}
</style>

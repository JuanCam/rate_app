<template>
    <div class="vote_bar">
      <div class="vote_bar__actions">
        <button class="vote_bar__btn vote_bar__btn--like" @click="addLike({ profileId: profile.id })">
          <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
        </button>
        <button class="vote_bar__btn vote_bar__btn--dislike" @click="addDislike({ profileId: profile.id })">
          <font-awesome-icon icon="thumbs-down"></font-awesome-icon>
        </button>
        <button
          class="vote_bar__cta"
          v-if="currentClickedId === profile.id"
          @click="addVote(profile)">
          Vote {{ prevVotedId === profile.id ? 'again' : 'now' }}
          </button>
      </div>
      <span v-if="voteError && voteError.profileId === profile.id">{{voteError.msg}}</span>
      <div class="vote_bar__results">
        <span class="vote_bar__rate vote_bar__rate--approvals" :style="{ width: `${calcApprovalRate(profile, false)}%` }">
          <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
          <span class="vote_bar__rate_value">{{calcApprovalRate(profile)}}%</span>
        </span>
        <span class="vote_bar__rate vote_bar__rate--disapprovals" :style="{ width: `${calcDispprovalRate(profile, false)}%` }">
          <font-awesome-icon icon="thumbs-down"></font-awesome-icon>
          <span class="vote_bar__rate_value">{{calcDispprovalRate(profile)}}%</span>
        </span>
      </div>
    </div>
</template>
<script>
import { ADD_DISLIKE, ADD_LIKE, ADD_VOTE } from '../store/mutations';
import { mapState, mapMutations } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faThumbsDown);

export default {
  computed: {
    ...mapState({
      prevVotedId: ({ profiles }) => profiles.prevVotedId,
      voteError: ({ profiles }) => profiles.voteError
    })
  },
  props: [
    'profile',
    'currentClickedId'
  ],
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
    calcApprovalRate(profile, fix = true) {
      const rate = 100 * (profile.approval / (profile.approval + profile.disapproval));

      return fix ? rate.toFixed(1) : rate;
    },
    calcDispprovalRate(profile, fix = true) {
      const rate = 100 * (profile.disapproval / (profile.approval + profile.disapproval));

      return fix ? rate.toFixed(1) : rate;
    },
    ...mapMutations([
      ADD_LIKE,
      ADD_DISLIKE,
      ADD_VOTE
    ])
  }
}
</script>
<style lang="scss">
@import "../css/abstract/mixins";

.vote_bar {
  &__cta {
    padding: 0 20px;
    color: #ffffff;
    background-color: rgba(29, 28, 28, 0.3);
    border: 1px solid #ffffff;
    cursor: pointer;
    font-size: 1.4rem;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(border-width, 1px);
      @include calc-dimension(padding-left, 20px);
      @include calc-dimension(padding-right, 20px);
    }
  }

  &__actions {
    display: flex;
    padding: 0 35px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding-left, 35px);
      @include calc-dimension(padding-right, 35px);
    }
  }

  &__btn {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    font-size: 1.4rem;
    color: #ffffff;
    cursor: pointer;
    border: 0;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(width, 30px);
      @include calc-dimension(height, 30px);
      @include calc-dimension(margin-right, 5px);
    }

    &--dislike {
      background-color: $orange-color;
      transform: rotateY(180deg);
    }

    &--like {
      background-color: $blue-light-color;
    }
  }

  &__results {
    margin-top: 20px;
    color: #ffffff;
    background-color: transparent;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(margin-top, 20px);
    }
  }

  &__rate {
    height: 50px;
    padding-left: 10px;
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    transition: .35s width cubic-bezier(.44, .86, .72, .76);
    box-sizing: border-box;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding-left, 10px);
      @include calc-dimension(height, 50px);
      font-size: 2.5rem;
    }

    &_value {
      margin-left: 5px;

      @include breakpoint($mid-viewport) {
        @include calc-dimension(margin-left, 5px);
      }
    }

    &--approvals {
      background-color: $blue-light-color;
      opacity: .8;
    }

    &--disapprovals {
      background-color: $orange-color;
      opacity: .8;

      svg {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>

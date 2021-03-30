<template>
  <main>
    <hero
      :poll-item="poll.item"
      :poll-question="poll.question"
      :image="poll.image"
      :poll-deadline="poll.deadline" />
    <section class="rate_info">
      <div class="rate_info__content">
        <div class="rate_info__main_content">
          <p class="rate_info__title_content">Speak out. Be heard</p>
          <span class="rate_info__title_content rate_info__title_content--strong">Be counted</span>
        </div>
        <div class="rate_info__details_content">
            Rule of Thumb is a crowd sourced court of public opinion where anyone and everyone can speak out and speak freely. It’s easy: You share your opinion, we analyze and put the data in a public report.
        </div>
        <button class="rate_info__close_btn">X</button>
      </div>
    </section>
    <section class="rate_cards">
      <header class="rate_cards__header">
        <h1 class="rate_cards__header_heading">Previous Rulings</h1>
      </header>
      <!-- Cards -->
      <div class="rate_cards__card"
        v-for="(profile, index) in profiles"
        :key="index">
        <card
          :profile="profile"
          :image="profile.image"
          :title="profile.name"
          :legend="profile.area"
          :length-in-area="profile.lengthInArea"
          :content="prevVotedId === profile.id ? 'Thanks for voting' : profile.description">
            <vote-bar :profile="profile" :current-clicked-id="currentVotedId" />
        </card>
      </div>
    </section>
    <footer class="rate_footer">
      <div class="rate_footer__group">
        <nav class="rate_footer__links">
          <ul class="rate_footer__items rate_footer__items--nav">
            <li class="rate_footer__item rate_footer__item--nav">
              <a class="rate_footer__link" href="#">Terms and Conditions</a>
            </li>
            <li class="rate_footer__item rate_footer__item--nav">
              <a class="rate_footer__link" href="#">Privacy Policy</a>
            </li>
            <li class="rate_footer__item rate_footer__item--nav">
              <a class="rate_footer__link" href="#">Contact Us</a>
            </li>
          </ul>
        </nav>
        <div class="rate_footer__social">
          <ul class="rate_footer__items rate_footer__items--end">
            <li class="rate_footer__item">
                Follow Us
            </li>
            <li class="rate_footer__item">
              <a class="rate_footer__link rate_footer__link--icon" href="#">
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"></font-awesome-icon>
              </a>
            </li>
            <li class="rate_footer__item">
              <a class="rate_footer__link rate_footer__link--icon" href="#">
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"></font-awesome-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Hero from './components/hero/Hero.vue';
import Card from './components/Card.vue';
import VoteBar from './components/VoteBar.vue';
import { FETCH_PROFILES } from './store/actions';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faFacebook, faTwitter);

export default {
  name: 'App',
  data() {
    return {
      poll: {
          item: 'Pope Francis',
          question: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do labore et dolore
                      magna aliqua`,
          image: './assets/images/pope-francis.png',
          deadline: '22'
       }
    }
  },
  components: {
    'hero': Hero,
    'card': Card,
    'vote-bar': VoteBar,
    'font-awesome-icon': FontAwesomeIcon
  },
  computed: {
    ...mapState({
      profiles: ({ profiles }) => {
        return profiles.profiles
      },
      prevVotedId: ({ profiles }) => profiles.prevVotedId,
      currentVotedId: ({ profiles }) => profiles.currentVoteAction?.profileId
    })
  },
  created() {
    this.$store.dispatch(FETCH_PROFILES);
  }
}
</script>
<style lang="scss">
@import "css/main";

.rate_cards {
  display: grid;
  column-gap: 0;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;

  @include breakpoint($mid-viewport) {
    @include calc-dimension(column-gap, 40px);
    grid-template-columns: repeat(12, 1fr);
  }

  &__card {
    margin-top: 20px;
    grid-column: 1 / span 6;
    padding: 0 20px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(margin-top, 30px);
      grid-column: 2 / span 5;
      padding: 0;

      &:nth-of-type(even) {
        grid-column: 7 / span 5;
      }
    }
  }

  &__header {
    display: grid;
    padding: 0 20px;
    margin-top: 20px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    grid-column: 1 / span 6;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(margin-top, 20px);
      padding: 0;
      grid-template-columns: repeat(12, 1fr);
      grid-column: 1 / span 12;
    }

    &_heading {
      color: $gray;
      font-size: 4rem;
      grid-column: 1 / span 6;

      @include breakpoint($mid-viewport) {
        grid-column: 2 / span 10;
      }
    }
  }
}

.rate_info {
  display: grid;
  margin-top: 20px;
  padding: 0 20px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;

  @include breakpoint($mid-viewport) {
    @include calc-dimension(margin-top, 30px);
    grid-template-columns: repeat(12, 1fr);
    padding: 0;
  }
    
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    grid-column: 1 / span 6;
    padding: 20px;
    background-color: $light-gray;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding, 20px);
      grid-template-columns: repeat(10, 1fr);
      grid-column: 2 / span 10;
    }
  }

  &__main_content {
    grid-column: 1 / span 6;
    font-size: 2.2rem;

    @include breakpoint($mid-viewport) {
      grid-column: 1 / span 3;
    }
  }

  &__title_content {
    margin: 0;

    &--strong {
      font-family: 'RegularLato', 'sans-serif';
      font-size: 3.5rem;
    }
  }

  &__details_content {
    font-size: 1.5rem;
    grid-column: 1 / span 6;
    margin-top: 10px;

    @include breakpoint($mid-viewport) {
     grid-column: 4 / span 6;
     margin-top: 0;
    }
  }

  &__close_btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
}

.rate_footer {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  font-size: 1.2rem;
  color: $gray;
  padding: 0 20px;

  @include breakpoint($mid-viewport) {
    grid-template-columns: repeat(12, 1fr);
    padding: 0;
  }

  &__group {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    border-top: 1px dotted $gray;
    grid-column: 1 / span 6;
    margin: 30px 0;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(margin, 30px);
      grid-template-columns: repeat(10, 1fr);
      grid-column: 2 / span 10;
      margin-left: 0;
      margin-right: 0;
    }
  }

  &__links {
    grid-column: 1 / span 6;
  }

  &__link {
    text-decoration: none;
    color: $gray;

    &--icon {
      font-size: 2rem;
    }
  }


  &__items {
    display: flex;
    align-items: center;
    padding: 20px 0;
    margin: 0;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding, 20px);
      padding-left: 0;
      padding-right: 0;
    }

    &--nav {
      flex-direction: column;

      @include breakpoint($mid-viewport) {
        flex-direction: row;
        align-items:  center;
        padding-left: 0;
        padding-right: 0;
      }
    }

    &--end {
      @include breakpoint($mid-viewport) {
        justify-content: flex-end;
      }
    }
  }
 
  &__item {
    list-style: none;
    padding-right: 10px;

    @include breakpoint($mid-viewport) {
      @include calc-dimension(padding-right, 10px);
    }

    &--nav {
      padding: 10px 0;

      @include breakpoint($mid-viewport) {
        padding: 0;
        @include calc-dimension(padding-right, 10px);
      }

      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
 
  &__social {
    grid-column: 1 / span 6;

    @include breakpoint($mid-viewport) {
      grid-column: 8 / span 4;
    }
  }
}

</style>

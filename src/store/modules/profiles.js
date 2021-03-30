import { LOAD_PROFILES, ADD_LIKE, ADD_DISLIKE, ADD_VOTE } from '../mutations';
import { FETCH_PROFILES } from '../actions';

function updateProfilesStorage(rawProfiles) {
  const profiles = rawProfiles.map(profile => ({ ...profile }))

  localStorage.setItem('profiles', JSON.stringify({ profiles }));
}

export default {
  state() {
    return {
      profiles: [],
      currentVoteAction: null,
      prevVotedId: null,
      voteError: null
    };
  },
  mutations: {
    [LOAD_PROFILES] (state, newProfiles) {
      state.profiles = newProfiles;
      updateProfilesStorage(state.profiles);
    },

    [ADD_VOTE] (state, { id: profileIdToVote }) {
      const { profileId, action } = state.currentVoteAction;
      let profileIndex = -1;

      if (profileIdToVote !== profileId) {
        state.voteError = {
          msg: 'Please rate this profile',
          profileId: profileIdToVote
        };

        return false;
      }

      state.profiles.forEach(({ id }, index) => {
        if (id === profileId) {
          profileIndex = index;
        }
      });

      let newProfile = { ...state.profiles[profileIndex] };

      action === ADD_LIKE
        ? newProfile.approval++
        : newProfile.disapproval++;

      state.profiles[profileIndex] = newProfile;
      state.prevVotedId = profileId;
      state.voteError = null;
      updateProfilesStorage(state.profiles);
    },

    [ADD_LIKE] (state, { profileId }) {
      state.currentVoteAction = {
        profileId,
        action: ADD_LIKE
      };
    },

    [ADD_DISLIKE](state, { profileId }) {
      state.currentVoteAction = {
        profileId,
        action: ADD_DISLIKE
      };
    }
  },
  actions: {
    [FETCH_PROFILES] ({ commit }) {
      const cachedProfiles = localStorage.getItem('profiles');

      if (!cachedProfiles) {
        fetch('./mocks/profiles.json')
          .then(res => res.json())
          .then(({ profiles }) => {
            commit(LOAD_PROFILES, profiles);
          });
      } else {
        commit(LOAD_PROFILES, JSON.parse(cachedProfiles).profiles);
      }
    }
  }
};

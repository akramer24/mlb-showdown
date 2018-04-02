const SEND_CHALLENGE = 'SEND_CHALLENGE';
const RECEIVE_CHALLENGE = 'RECEIVE_CHALLENGE';
const REMOVE_CHALLENGE = 'REMOVE_CHALLENGE';
const UPDATE_CHALLENGE = 'UPDATE_CHALLENGE';

const defaultChallenges = {
  sent: [],
  received: []
}

export function sendChallenge(challenge) {
  return {
    type: SEND_CHALLENGE,
    challenge
  }
}

export function receiveChallenge(challenge) {
  return {
    type: RECEIVE_CHALLENGE,
    challenge
  }
}

export function removeChallenge(challenge) {
  return {
    type: REMOVE_CHALLENGE,
    challenge
  }
}

export function updateChallenge(challenge) {
  return {
    type: UPDATE_CHALLENGE,
    challenge
  }
}

export default function (state = defaultChallenges, action) {
  switch (action.type) {
    case SEND_CHALLENGE:
      return { ...state, sent: [...state.sent, action.challenge] }
    case RECEIVE_CHALLENGE:
      return { ...state, received: [...state.received, action.challenge] };
    case UPDATE_CHALLENGE:
      return {
        ...state, received: state.received.filter(challenge => {
          if (challenge.to.teamName === action.challenge.to.teamName) return action.challenge;
        })
      }
    case REMOVE_CHALLENGE:
    return {
      received: state.received.filter(challenge => {
        if (challenge.from.teamName !== action.challenge.from.teamName) return action.challenge;
      }), sent: state.sent.filter(challenge => {
          if (challenge.to.teamName !== action.challenge.to.teamName) return action.challenge;
        })
      }
    default:
      return state;
  }
}

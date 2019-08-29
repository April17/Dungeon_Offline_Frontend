import actions from "../actions/utilityActions";


export const modalToggle = modalState => dispatch => {
  dispatch(actions.modalToggle(modalState))
};

export const monsterHpToggle = state => dispatch => {
  dispatch(actions.monsterHpToggle(state))
}

export const uiToggle = state => dispatch => {
  dispatch(actions.uiToggle(state))
}

export const cooldownToggle = state => dispatch => {
  dispatch(actions.cooldownToggle(state))
}

export const gameInputToggle = state => dispatch => {
  dispatch(actions.gameInputToggle(state))
}

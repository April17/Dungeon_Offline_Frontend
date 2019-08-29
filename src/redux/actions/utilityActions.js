export default {
  modalToggle: state => ({ type: "MODAL_TOGGLE", payload: state }),
  monsterHpToggle: state => ({ type: "MONSTER_HP_TOGGLE", payload: state}),
  uiToggle: state => ({type: "UI_TOGGLE", payload: state}),
  cooldownToggle: state => ({type: "COOLDOWN_TOGGLE", payload: state}),
  gameInputToggle: state => ({type: "GAME_INPUT_TOGGLE", payload: state})
};

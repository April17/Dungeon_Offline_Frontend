const defaultState = {
  edit_account_modal: false,
  create_character_modal: false,
  delete_accout_modal: false,
  monster_hp_toggle: "No-Space hide",
  ui_toggle: "frostglass hide",
  gameInputToggle: true,
  cooldownState: {
    small_HP: false,
    large_HP: false,
    atk_potion: false,
    super_atk_potion: false
  }
}
export default (state = defaultState, action) => {

  switch (action.type) {
    case 'MODAL_TOGGLE':
      return {...state, [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]}
    case 'MONSTER_HP_TOGGLE':
      return {...state, monster_hp_toggle: action.payload}
    case 'UI_TOGGLE':
      return {...state, ui_toggle: action.payload}
    case 'COOLDOWN_TOGGLE':
      return {...state, cooldownState: {...state.cooldownState, ...action.payload}}
    case 'GAME_INPUT_TOGGLE':
      return {...state, gameInputToggle: action.payload}
    default:
      return state
  }
}

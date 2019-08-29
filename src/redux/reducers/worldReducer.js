const defaultState = {
  worldInfo: {
    id: 0,
    name: "",
    current_user_count: 0,
    capacity: 5,
    monsters: [],
    characters: []
  },
}
export default (state = defaultState, action) => {

  switch (action.type) {
    case 'INIT_WORLD':
      return {...state, worldInfo: action.payload}
    default:
      return state
  }
}

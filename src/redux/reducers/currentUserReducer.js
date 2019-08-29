const defaultState = {
  username: "",
  name: "",
  characters: [
    {
      id: 0,
      name: "",
      level: 1,
      exp_next_level: 100,
      exp: 0,
      max_hp: 100,
      hp: 1,
      atk: 10,
      def: 10,
      x: 500,
      y: 500,
      unique_character_owned_items:[
        {
          item_id: 0,
          quantity: 0,
          item: {
            id: 0,
            name: "",
            effect: "",
            key: "",
            status: ""
          }
        }
      ]
    }
  ]
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GOT_USER_INFO':
      return action.payload
    case 'LOGIN_FAIL':
      return {...state}
    case 'LOGOUT':
      return defaultState
    default:
      return state
  }
}

const defaultState = false

export default (state = defaultState, action) => {
  // console.log('in root reducer', action);

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return true
    default:
      return state
  }
}

import actions from "../actions/worldActions";
import { API_ROOT } from '../../actioncable';


export const getNewWorld = (characterId) => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(characterId)
  }
 fetch(`${API_ROOT}/worlds`, config)
    .then(rsp => rsp.json())
    .then(worldData => {
      dispatch(actions.initWorld(worldData))
    })
}

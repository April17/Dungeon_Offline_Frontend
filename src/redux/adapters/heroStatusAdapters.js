import actions from "../actions/heroStatusActions";
import { API_ROOT } from '../../actioncable';

export const initGame = characterInfo => dispatch => {
  dispatch(actions.initGameAction(characterInfo));
};

export const updateHeroStatus = status => dispatch => {
  dispatch(actions.updateHeroStatusAction(status));
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(status)
  }
  fetch(`${API_ROOT}/characters/${status.id}`, config)
};

export const useItem = data => dispatch => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(data)
  }
  fetch(`${API_ROOT}/character_items/${data.item_id}`, config)
    .then(rsp => rsp.json())
    .then(newInventory => dispatch(actions.useItem(newInventory))
)

}

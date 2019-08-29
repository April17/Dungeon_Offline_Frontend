import actions from "../actions/monsterStatusActions";
import { addLog } from './feedAdapters'
import { API_ROOT } from '../../actioncable';

export const updateMonsterStatus = status => dispatch => {
  dispatch(actions.updateMonsterStatusAction(status));
};

export const requestItemDrop = data => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(data)
  }
  fetch(`${API_ROOT}/character_items`, config)
    .then(rsp => rsp.json())
    .then(data => {
      if (data.message) {
        return null
      } else {
        dispatch(actions.dropedItem(data))
        dispatch(addLog({summary: `-${data[0].character_name} obtain ${data[0].item.name}.`}))
      }
    })
}

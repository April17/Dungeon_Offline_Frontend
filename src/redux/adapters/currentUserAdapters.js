import actions from "../actions/currentUserActions";
import utilityActions from "../actions/utilityActions";
import { API_ROOT, HEADERS } from '../../actioncable';


export const logIn = logInData => dispatch => {
  const config = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(logInData)
  }
  return fetch(`${API_ROOT}/login`, config)
    .then(rsp => rsp.json())
    .then(data => {
      localStorage.token = data.token
      dispatch(actions.loginSuccess())
    })
    .catch(error => {
      dispatch(actions.loginFail(error))
    })
};

export const getCurrentUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.token
    }
  }
 fetch(`${API_ROOT}/profile`, config)
    .then(rsp => rsp.json())
    .then(userData => {
      dispatch(actions.gotUserInfo(userData))
    })
}

export const signUp = signUpData => dispatch => {
  const config = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(signUpData)
  }
  return fetch(`${API_ROOT}/users`, config)
    .then(rsp => rsp.json())
}

export const logOut = () => dispatch => {
  localStorage.clear()
  dispatch(actions.logOut())
}

export const editAccount = (newUserInfo) => dispatch => {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(newUserInfo)
  }
  return fetch(`${API_ROOT}/users/update`, config)
    .then(rsp => rsp.json())
    .then(data => {
      if (!data.errors) {
        dispatch(actions.gotUserInfo(data))
        dispatch(utilityActions.modalToggle({edit_account_modal: false}))
      } else {
        console.log(data.errors);
      }
    })
}

export const deleteAccount = (route) => dispatch => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    }
  }
  return fetch(`${API_ROOT}/users/delete_accout`, config)
    .then(rsp => rsp.json())
    .then(data => {
      if (!data.errors) {
        localStorage.clear()
        console.log(data.success);
        dispatch(actions.logOut())
        dispatch(utilityActions.modalToggle({delete_accout_modal: false}))
        route.push("/")
      } else {
        console.log(data.errors);
      }
    })
}

export const createCharacter = (newCharacterInfo) => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(newCharacterInfo)
  }
  return fetch(`${API_ROOT}/characters`, config)
    .then(rsp => rsp.json())
    .then(data => {
      if (!data.errors) {
        dispatch(actions.gotUserInfo(data))
        dispatch(utilityActions.modalToggle({create_character_modal: false}))
      } else {
        console.log(data.errors);
      }
    })
}

export const deleteCharacter = (characterId) => dispatch => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.token
    },
    body: JSON.stringify(characterId)
  }
  return fetch(`${API_ROOT}/characters/${characterId}`, config)
    .then(rsp => rsp.json())
    .then(data => {
      if (!data.errors) {
        dispatch(actions.gotUserInfo(data))
        dispatch(utilityActions.modalToggle({delete_character_modal: false}))
      } else {
        console.log(data.errors);
      }
    })
}

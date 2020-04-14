export const signIn = content => {
  return async dispatch => {
    window.localStorage.setItem('loggedUserJSON', JSON.stringify(content))
    console.log(window.localStorage.getItem('loggedUserJSON'))
    dispatch({
      type: 'SIGN_IN',
      data: content,
    })
  }
}

export const signOut = () => {
  window.localStorage.removeItem('loggedUserJSON')
  return async dispatch => {
    dispatch({
      type: 'SIGN_OUT',
    })
  }
}

export const getStoredUser = () => {
  return async dispatch => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedUserJSON'))
    if (storedUser)
      dispatch({
        type: 'SIGN_IN',
        data: storedUser,
      })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.data
    case 'SIGN_OUT':
      return null
    default:
      return state
  }
}

export default reducer

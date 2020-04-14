const initialState = {
  display: 'none',
  content: ''
}

export const hideNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: ''
  }
}

export const setNotification = (text, type, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: text,
        type: type
      },
    })

    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  const newNotification = {
    ...action.data
  }

  switch (action.type) {
    case 'SET_NOTIFICATION':
      newNotification.display = ''
      return newNotification
    case 'REMOVE_NOTIFICATION':
      newNotification.display = 'none'
      return newNotification
    default:
      return state
  }
}

export default notificationReducer

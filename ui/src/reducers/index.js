export function visibilityFilter(state = '*', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export function current(state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT':
      return action.data.restaurant;
    case 'RESET_CURRENT':
    case 'DELETE':
    case 'UPDATE':
      return null;
    case 'CHANGE_CURRENT':
      return { ...state, ...action.data }
    default:
      return state
  }
}

export function restaurants(state = [], action) {
  switch (action.type) {
    case 'DELETE':
      return state.filter(r => r.Id !== action.data.Id);
    case 'UPDATE':
      return state.map((r) => r.Id === action.data.restaurant.Id ? action.data.restaurant : r);
    case 'LOAD':
      return action.data;
    default:
      return state
  }
}
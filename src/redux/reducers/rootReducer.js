const rootReducer = (state = {data: []}, action) => {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return {...state, data: action.payload};
    case 'DELETE_FROM_LIST':
      return {...state};
    default:
      return {...state};
  }
};

export default rootReducer;

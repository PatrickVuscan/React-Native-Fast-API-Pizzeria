const actionTypes = {
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_ID: 'UPDATE_ID',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_PRICE: 'UPDATE_PRICE',
};

const actionCreators = {
  updateRequest: (request) => ({ type: actionTypes.UPDATE_REQUEST, payload: request }),
  updateID: (id) => ({ type: actionTypes.UPDATE_ID, payload: id }),
  updateName: (name) => ({ type: actionTypes.UPDATE_NAME, payload: name }),
  updatePrice: (price) => ({ type: actionTypes.UPDATE_PRICE, payload: price }),
};

const initialState = {
  request: 'POST',
  id: '',
  name: '',
  price: 0.00,
};

const reducer = (state, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_REQUEST:
    return { ...state, request: action.payload };
  case actionTypes.UPDATE_ID:
    return { ...state, id: action.payload };
  case actionTypes.UPDATE_NAME:
    return { ...state, name: action.payload };
  case actionTypes.UPDATE_PRICE:
    return { ...state, price: action.payload };
  default:
    return state;
  }
};

export { actionCreators, initialState, reducer };

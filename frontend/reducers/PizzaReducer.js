const actionTypes = {
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_ID: 'UPDATE_ID',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_SIZE: 'UPDATE_SIZE',
  UPDATE_BASE_PRICE: 'UPDATE_BASE_PRICE',
  UPDATE_TOPPINGS: 'UPDATE_TOPPINGS',
};

const actionCreators = {
  updateRequest: (request) => ({ type: actionTypes.UPDATE_REQUEST, payload: request }),
  updateID: (id) => ({ type: actionTypes.UPDATE_ID, payload: id }),
  updateName: (name) => ({ type: actionTypes.UPDATE_NAME, payload: name }),
  updateSize: (size) => ({ type: actionTypes.UPDATE_SIZE, payload: size }),
  updatePrice: (price) => ({ type: actionTypes.UPDATE_BASE_PRICE, payload: price }),
  updateToppings: (toppings) => ({ type: actionTypes.UPDATE_TOPPINGS, payload: toppings }),
};

const initialState = {
  request: 'POST',
  id: '',
  name: '',
  size: 3, // Small Pizza
  basePrice: 0.00,
  toppings: [],
};

const reducer = (state, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_REQUEST:
    return { ...state, request: action.payload };
  case actionTypes.UPDATE_ID:
    return { ...state, id: action.payload };
  case actionTypes.UPDATE_NAME:
    return { ...state, name: action.payload };
  case actionTypes.UPDATE_SIZE:
    return { ...state, size: action.payload };
  case actionTypes.UPDATE_BASE_PRICE:
    return { ...state, basePrice: action.payload };
  case actionTypes.UPDATE_TOPPINGS:
    return { ...state, toppings: action.payload };
  default:
    return state;
  }
};

export { actionCreators, initialState, reducer };

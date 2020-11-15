const actionTypes = {
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_ORDER_ID: 'UPDATE_ORDER_ID',
  UPDATE_PIZZAS: 'UPDATE_PIZZAS',
  UPDATE_DRINKS: 'UPDATE_DRINKS',
  UPDATE_CUSTOMER_ID: 'UPDATE_CUSTOMER_ID',
  UPDATE_IS_COMPLETED: 'UPDATE_IS_COMPLETED',
  UPDATE_DELIVERY_METHOD: 'UPDATE_DELIVERY_METHOD',
};

const actionCreators = {
  updateRequest: (request) => ({ type: actionTypes.UPDATE_REQUEST, payload: request }),
  updateOrderID: (id) => ({ type: actionTypes.UPDATE_ORDER_ID, payload: id }),
  updateCustomerID: (id) => ({ type: actionTypes.UPDATE_CUSTOMER_ID, payload: id }),
  updatePizzas: (pizzas) => ({ type: actionTypes.UPDATE_PIZZAS, payload: pizzas }),
  updateDrinks: (drinks) => ({ type: actionTypes.UPDATE_DRINKS, payload: drinks }),
  updateIsCompleted: (completed) => ({ type: actionTypes.UPDATE_IS_COMPLETED, payload: completed }),
  updateDeliveryMethod: (delivery_method) => ({
    type: actionTypes.UPDATE_DELIVERY_METHOD,
    payload: delivery_method,
  }),
};

const initialState = {
  request: 'POST',
  order_id: '',
  customer_id: '',
  pizzas: [],
  drinks: [],
  is_completed: false,
  delivery_method: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_REQUEST:
    return { ...state, request: action.payload };
  case actionTypes.UPDATE_CUSTOMER_ID:
    return { ...state, customer_id: action.payload };
  case actionTypes.UPDATE_ORDER_ID:
    return { ...state, order_id: action.payload };
  case actionTypes.UPDATE_DRINKS:
    return { ...state, drinks: action.payload };
  case actionTypes.UPDATE_PIZZAS:
    return { ...state, pizzas: action.payload };
  case actionTypes.UPDATE_IS_COMPLETED:
    return { ...state, is_completed: action.payload };
  case actionTypes.UPDATE_DELIVERY_METHOD:
    return { ...state, delivery_method: action.payload };
  default:
    return state;
  }
};

export { actionCreators, initialState, reducer };

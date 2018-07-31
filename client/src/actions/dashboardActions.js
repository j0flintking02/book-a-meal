import config from '../config';
import {
  GET_TOTAL_ORDERS_ERROR,
  GET_TOTAL_ORDERS_REQUEST,
  GET_TOTAL_ORDERS_SUCCESS,
  GET_TOTAL_AMOUNT_ERROR,
  GET_TOTAL_AMOUNT_REQUEST,
  GET_TOTAL_AMOUNT_SUCCESS,
  FETCH_ALL_ORDERS_ERROR,
  FETCH_ALL_ORDERS_REQUEST,
  FETCH_ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from '../constants/orderActionTypes';
import dashboardService from '../helpers/dashboardService';
import orderService from '../helpers/orderService';
import transformError from '../helpers/transformError';

/**
 * Get total amount success action creator
 *
 * @export
 * @param {number} totalAmount Total amount
 *
 * @returns {object} Redux action
 */
export const getTotalAmountSuccess = totalAmount => ({
  type: GET_TOTAL_AMOUNT_SUCCESS,
  payload: { totalAmount },
});

/**
 * Get total amount error action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const getTotalAmountError = error => ({
  type: GET_TOTAL_AMOUNT_ERROR,
  payload: { error },
});

/**
 * Get total amount async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getTotalAmount = () => async (dispatch) => {
  dispatch({ type: GET_TOTAL_AMOUNT_REQUEST });
  try {
    const totalAmount = await dashboardService
      .getTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount`);
    dispatch(getTotalAmountSuccess(totalAmount));
  } catch (error) {
    dispatch(getTotalAmountError(error));
  }
};

/**
 * Get total number of orders made success action creator
 *
 * @export
 * @param {number} totalOrders Total number of orders made
 *
 * @returns {object} Redux action
 */
export const getTotalOrdersSuccess = totalOrders => ({
  type: GET_TOTAL_ORDERS_SUCCESS,
  payload: { totalOrders },
});

/**
 * Get total number of orders made error action creator
 *
 * @export
 * @param {string} error
 *
 * @returns {object} Redux action
 */
export const getTotalOrdersError = error => ({
  type: GET_TOTAL_ORDERS_ERROR,
  payload: { error },
});

/**
 * Get total number of orders made async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getTotalOrders = () => async (dispatch) => {
  dispatch({ type: GET_TOTAL_ORDERS_REQUEST });
  try {
    const totalOrders = await dashboardService
      .getTotalNumberOfOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders`);
    dispatch(getTotalOrdersSuccess(totalOrders));
  } catch (error) {
    dispatch(getTotalOrdersError(error));
  }
};

/**
 * Fetch all orders success action creator
 *
 * @export
 * @param {Array} orders Array of order objects
 *
 * @returns {object} Redux action
 */
export const fetchAllOrdersSuccess = orders => ({
  type: FETCH_ALL_ORDERS_SUCCESS,
  payload: { orders },
});

/**
 * Fetch all orders error action creator
 *
 * @export
 * @param {string} error
 *
 * @returns {object} Redux action
 */
export const fetchAllOrdersError = error => ({
  type: FETCH_ALL_ORDERS_ERROR,
  payload: { error },
});

/**
 * Fetch all orders async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const fetchAllOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_ORDERS_REQUEST });
  try {
    const orders = await dashboardService
      .getAllOrders(`${config.API_BASE_URL}/api/v1/orders`);
    dispatch(fetchAllOrdersSuccess(orders));
  } catch (error) {
    dispatch(fetchAllOrdersError(error));
  }
};

/**
 * Delete order success action creator
 *
 * @export
 * @param {number} id Order id
 *
 * @returns {object} Redux action
 */
export const deleteOrderSuccess = id => ({
  type: DELETE_ORDER_SUCCESS,
  payload: { id },
});

/**
 * Delete order error action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const deleteOrderError = error => ({
  type: DELETE_ORDER_ERROR,
  payload: { error },
});

/**
 * Delete order async action creator
 *
 * @export
 * @param {number} orderId Order id
 *
 * @returns {Function} Async function
 */
export const deleteOrder = orderId => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    await orderService
      .deleteOrder(`${config.API_BASE_URL}/api/v1/orders/${orderId}`);
    dispatch(deleteOrderSuccess(orderId));
  } catch (error) {
    dispatch(deleteOrderError(transformError(
      error,
      'Error deleting order, please try again',
    )));
  }
};

/**
 * Update order success action creator
 *
 * @export
 * @param {object} order
 *
 * @returns {object} Redux action
 */
export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: { order },
});

/**
 * Update order error  action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const updateOrderError = error => ({
  type: UPDATE_ORDER_ERROR,
  payload: { error },
});

/**
 * Update order async action creator
 *
 * @export
 * @param {object} values Order payload
 * @param {number} orderId
 *
 * @returns {Function}
 */
export const updateOrder = (values, orderId) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });
  try {
    const updatedOrder = await orderService
      .updateOrder(`${config.API_BASE_URL}/api/v1/orders/${orderId}`, values);
    dispatch(updateOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(deleteOrderError(transformError(
      error,
      'Error updating order, please try again',
    )));
  }
};
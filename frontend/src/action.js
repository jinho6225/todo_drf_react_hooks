export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';// export const TOGGLE_TODO = 'TOGGLE_TODO'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


export const requestTodos = () => (dispatch) => {
    dispatch({ type: REQUEST_PENDING });
    fetch('http://127.0.0.1:8000/api/task-list/')
        .then((res) => res.json())
        .then((data) => dispatch({ type: REQUEST_SUCCESS, payload: data }))
        .catch((err) => dispatch({ type: REQUEST_FAILED, payload: err }));
};

// export function toggleTodo(index) {
//   return { type: TOGGLE_TODO, index }
// }

// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }
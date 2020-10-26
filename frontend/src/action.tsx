export const REQUEST_PENDING = 'REQUEST_PENDING' as const
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS' as const
export const REQUEST_FAILED = 'REQUEST_FAILED' as const


export const requestTodos = () => (dispatch: any) => {
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
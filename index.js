function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map((todo) => todo !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete }))
        default:
            return state
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function createStore(reducer) {
    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos)
store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn React',
        complete: false
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Read a book',
        complete: true
    }
})
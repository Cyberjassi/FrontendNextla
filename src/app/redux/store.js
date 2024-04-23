import reducer from './slice'

const {configureStore} = require('@reduxjs/toolkit')
// in which we confiure our actions and reducer
export const store = configureStore({
    reducer
})
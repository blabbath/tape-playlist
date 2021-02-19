import { createStore } from 'vuex'
import auth from './modules/auth'
import tape from './modules/tape'

export const store = createStore({ modules: { auth, tape } })

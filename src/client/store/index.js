import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import createSagaMonitor from 'saga-monitor'
import { createBrowserHistory } from 'history'
import reducers from '../reducers'
import rootSaga from '../sagas'

/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
function configureStore () {
  const sagaMonitor = createSagaMonitor({
    level: 'log',
    actionDispatch: true,
  })
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  const enhancer = compose(
    applyMiddleware(logger),
    applyMiddleware(sagaMiddleware)
  )

  const store = createStore(reducers, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}

export const store = configureStore()

export const history = createBrowserHistory()

import { createStore } from 'redux';

import reducer from './reducers';
import { targetsReload } from './actions';

const store = createStore(reducer);

export default store;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import companyReducer from '../features/company/companySlice';
import sessionReducer from '../features/session/sessionSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    session: sessionReducer,
    company: companyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store);

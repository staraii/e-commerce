import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "store/store.ts";
import App from './App.tsx'
import './index.css'

const firebaseConfig = {
	apiKey: import.meta.env.DB_PASSWORD,
	authDomain: import.meta.env.AUTH_DOMAIN,
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: "",
};
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

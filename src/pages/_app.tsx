import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { AppProvider } from "../data/context/AppContext";
import { AuthProvider } from "../data/context/AuthContext";
//Redux
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;

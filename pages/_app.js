import "@/styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar/Navbar";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />

      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

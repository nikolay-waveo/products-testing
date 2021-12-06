import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import "../styles/styles.css";

// TODO: make host dynamic

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider i18n={translations}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;

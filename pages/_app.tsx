import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import React from "react";
import { SWRConfig } from "swr";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AppProvider i18n={translations}>
        <Component {...pageProps} />
      </AppProvider>
    </SWRConfig>
  );
}

export default MyApp;

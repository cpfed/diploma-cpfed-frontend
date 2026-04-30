import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import appWithI18n from "next-translate/appWithI18n";
import i18nConfig from "../../i18n.json";
import Layout from "@/components/layouts/Layout";
import Profile from "@/components/layouts/Profile";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";

const i18nConfigWithLoader = {
    ...i18nConfig,
    loadLocaleFrom: (lang: string, ns: string) =>
        import(`../../locales/${lang}/${ns}.json`).then((m) => m.default),
};

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <Provider store={store}>
            <Layout {...pageProps}>
                {router.pathname.startsWith("/profile") ? (
                    <Profile {...pageProps}>
                        <Component {...pageProps} />
                    </Profile>
                ) : (
                    <Component {...pageProps} />
                )}
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    limit={5}
                />
            </Layout>
        </Provider>
    );
}

export default appWithI18n(App as any, i18nConfigWithLoader);

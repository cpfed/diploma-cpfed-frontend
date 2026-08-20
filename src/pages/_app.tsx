import "@/styles/globals.scss";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import Layout from "@/components/layouts/Layout";
import Profile from "@/components/layouts/Profile";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";

type NextPageWithLayout = NextPage & {
    noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();

    if (Component.noLayout) {
        return (
            <Provider store={store}>
                <Component {...pageProps} />
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
            </Provider>
        );
    }

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

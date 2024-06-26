import { Layout } from "@/components/Layout";
import "@/styles/main.scss";
import axios from "axios";
import type { AppProps } from "next/app";

axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

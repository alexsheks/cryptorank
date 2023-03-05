import { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import CurrencyConverter from "~/components/CurrencyConverter";
import { fetcher } from ".";

const Converter: NextPage = () => {
  const { data, error, isLoading } = useSWR<Currency[]>(
    "https://api.cryptorank.io/v1/currencies?api_key=dfb7e374d4831d0143754045efd95fee1a77b03d5b997bceab8353b247f0&limit=15",
    fetcher
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading || !data) return <div>загрузка...</div>;

  return (
    <>
      <Head>
        <title>Converter</title>
        <meta name="description" content="Powered by Cryptorank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CurrencyConverter data={data} />;
    </>
  );
};

export default Converter;

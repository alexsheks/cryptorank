import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import WatchlistTable from "~/components/WatchlistTable";

export const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.data);

const Home: NextPage = () => {
  const { data, error, isLoading } = useSWR<Currency[]>(
    "https://tstapi.cryptorank.io/v0/coins?limit=15",
    fetcher
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading || !data) return <div>загрузка...</div>;

  return (
    <>
      <Head>
        <title>Watchlist</title>
        <meta name="description" content="Powered by Cryptorank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WatchlistTable data={data} />
    </>
  );
};

export default Home;

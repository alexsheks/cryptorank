import axios from "axios";

const fetchData = async (url: string) => {
  return axios.get(url).then((res) => res.data);
};

test("fetch 15 samples of currencies", async () => {
  return fetchData("https://tstapi.cryptorank.io/v0/coins?limit=15").then(
    (data) => {
      expect(data.data.length).toBe(15);
    }
  );
});

test("fetch bitcoin", async () => {
  return fetchData("https://tstapi.cryptorank.io/v0/coins/bitcoin").then(
    (data) => {
      expect(data.data.name).toBe("Bitcoin");
    }
  );
});

test("fetch 15 samples of test currencies", async () => {
  return fetchData(
    "https://api.cryptorank.io/v1/currencies?api_key=dfb7e374d4831d0143754045efd95fee1a77b03d5b997bceab8353b247f0&limit=15"
  ).then((data) => {
    expect(data.data.length).toBe(15);
  });
});

test("fetch test bitcoin", async () => {
  return fetchData(
    "https://api.cryptorank.io/v1/currencies/1?api_key=dfb7e374d4831d0143754045efd95fee1a77b03d5b997bceab8353b247f0"
  ).then((data) => {
    expect(data.data.name).toBe("Bitcoin");
  });
});

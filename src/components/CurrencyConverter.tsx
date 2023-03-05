import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { convertValue } from "~/utils/format";

interface CurrencyConverterProps {
  data: Currency[];
}

const CurrencyConverter = ({ data }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [firstRender, setFirstRender] = useState(false);
  const [primaryCurrency, setPrimaryCurrency] = useState<Currency>(data[0]!);
  const [secondaryCurrency, setSecondaryCurrency] = useState<Currency | string>(
    "USD"
  );
  const [primaryValue, setPrimaryValue] = useState<string>("Bitcoin");
  const [secondaryValue, setSecondaryValue] = useState<string>("USD");

  useEffect(() => {
    if (firstRender) {
      ["USD", ...data].map((currency: Currency | string) => {
        if (typeof currency === "string") {
          if (currency === secondaryValue) {
            setSecondaryCurrency(currency);
          }
        } else {
          if (currency.name === primaryValue) {
            setPrimaryCurrency(currency);
          }

          if (currency.name === secondaryValue) {
            setSecondaryCurrency(currency);
          }
        }
      });
    }

    setFirstRender(true);
  }, [primaryValue, secondaryValue]);

  return (
    <Container>
      <h1 style={{ textTransform: "uppercase" }}>convert</h1>
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(event) =>
          event.target.value === ""
            ? setAmount(0)
            : setAmount(parseInt(event.target.value))
        }
      />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <select
          onChange={(event) => setPrimaryValue(event.target.value)}
          value={primaryValue}
        >
          {data.map((currency: Currency) => {
            return (
              <option key={currency.key} value={currency.name}>
                {currency.name}
              </option>
            );
          })}
        </select>
        {/* <Swap>swap values</Swap> */}
        <select
          onChange={(event) => setSecondaryValue(event.target.value)}
          style={{ marginLeft: "5px" }}
        >
          {["USD", ...data].map((currency: Currency | string) => {
            return (
              <option
                key={typeof currency === "string" ? currency : currency.key}
                value={typeof currency === "string" ? currency : currency.name}
              >
                {typeof currency === "string" ? currency : currency.name}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <span>{amount + " " + primaryCurrency?.symbol}</span>
        <span>&nbsp; = &nbsp;</span>
        <span>
          {convertValue(
            amount,
            primaryCurrency.values.USD.price,
            typeof secondaryCurrency === "string"
              ? 1
              : secondaryCurrency.values.USD.price
          ) +
            " " +
            (typeof secondaryCurrency === "string"
              ? secondaryCurrency
              : secondaryCurrency.symbol)}
        </span>
      </div>
      <WatchlistLink href={"/"}>to watchlist</WatchlistLink>
    </Container>
  );
};

export default CurrencyConverter;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Swap = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const WatchlistLink = styled(Link)`
  /* margin-bottom: 10px; */
  margin-top: 20px;
  font-weight: bold;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;

import Link from "next/link";
import styled from "styled-components";
import { fromATH, nFormatter, toATH } from "~/utils/format";

interface WatchlistTableProps {
  data: Currency[];
}

const WatchlistTable = ({ data }: WatchlistTableProps) => {
  return (
    <Container>
      <h4 style={{ textTransform: "uppercase" }}>watchlist</h4>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Price ($)</TableHeader>
            <TableHeader>Circulating supply</TableHeader>
            <TableHeader>Market Cap ($)</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>From ATH (%)</TableHeader>
            <TableHeader>To ATH (%)</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map((currency: Currency) => {
            return (
              <TableRow key={currency.key}>
                <TableCell>{currency.name}</TableCell>
                <TableCell>
                  $&nbsp;
                  {currency.price.USD.toPrecision(5)}
                </TableCell>
                <TableCell>
                  {currency.symbol}&nbsp;&nbsp;
                  {nFormatter(currency.availableSupply, 2)}
                </TableCell>
                <TableCell>
                  $&nbsp; {nFormatter(currency.marketCap, 1)}
                </TableCell>
                <TableCell>{currency.category}</TableCell>
                <TableCell color="Negative">
                  {fromATH(currency.athPrice.USD, currency.price.USD)}
                  &nbsp;%
                </TableCell>
                <TableCell color="Positive">
                  +
                  {nFormatter(
                    toATH(currency.athPrice.USD, currency.price.USD),
                    2
                  )}
                  &nbsp;%
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <ConverterLink href={"/converter"}>to converter</ConverterLink>
    </Container>
  );
};

export default WatchlistTable;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 90%;
  height: fit-content;
`;

const TableRow = styled.tr`
  padding-top: 2px;
  padding-bottom: 2px;
`;

const TableCell = styled.td`
  padding-top: 5px;
  padding-bottom: 5px;
  color: ${(props: { color?: "Negative" | "Positive" | "Neutral" }) =>
    props.color == "Negative"
      ? "red"
      : props.color == "Positive"
      ? "green"
      : "inherit"};
`;

const TableHeader = styled.th`
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: start;
`;

const ConverterLink = styled(Link)`
  /* margin-bottom: 10px; */
  margin-top: 20px;
  font-weight: bold;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;

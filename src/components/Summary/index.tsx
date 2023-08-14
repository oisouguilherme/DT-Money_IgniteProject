import { TransactionContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";
import { SumaryCard, SummaryContainer } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
export function Summary() {
  const { transactions } = useContext(TransactionContext);

  const sumary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );
  return (
    <SummaryContainer>
      <SumaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(sumary.income)}</strong>
      </SumaryCard>

      <SumaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(sumary.outcome)}</strong>
      </SumaryCard>

      <SumaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#FFF" />
        </header>

        <strong>{priceFormatter.format(sumary.total)}</strong>
      </SumaryCard>
    </SummaryContainer>
  );
}

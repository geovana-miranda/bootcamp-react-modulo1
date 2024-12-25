import { sanitizedBackend } from "./data/investments";
import { formatMoney, formatPercent, getMonth } from "./helpers/helpers";

function Investments({ children }) {
  return <div>{children}</div>;
}

function Investment({ children: investment }) {
  const investmentClassName =
    investment.balance > 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="border p-4">
      <h2 className="text-center font-semibold text-xl">
        {investment.description}
      </h2>
      <h3 className="text-center font-semibold text-xl">
        Rendimento total de{" "}
        <span className={investmentClassName}>
          {formatMoney(investment.balance)} (
          {formatPercent(investment.totalPercentage)})
        </span>
      </h3>
      <ul className="border">
        {investment.reports.map((i, index) => {
          const reportClassName =
            i.percentage === 0
              ? "text-black"
              : i.percentage > 0
              ? "text-green-500"
              : "text-red-500";

          const lineColorClassName = index % 2 === 1 ? "bg-gray-100" : "bg-white";

          return (
            <li
              key={i.id}
              className={`flex flex-row items-center justify-between p-1 ${lineColorClassName}`}
            >
              <span className="font-mono">
                {getMonth(i.month)}/{i.year}
              </span>
              <span className="flex-1 ml-4">{formatMoney(i.value)}</span>
              <span className={reportClassName}>{formatPercent(i.percentage)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Investments>
        {sanitizedBackend.map((i) => (
          <Investment key={i.id}>{i}</Investment>
        ))}
      </Investments>
    </>
  );
}

import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const PRINCIPAL = 610000;
const YEARLY_INTEREST = 7.5; // equates to about 7% interest yearly
const MONTHLY_LOSS = 7076;
const INFLATION_PER_MONTH = 1.003;
const MONTHS_MOM_WORKS = 60;
const DAD_MONTHLY_INCOME = 2000;
const MONTHS_DAD_WORKS = 0;
const MOM_MONTHLY_INCOME = 1800;
const MOM_HEALTHCARE_MONTHLY = 300;

function calculateYears(
  principal: number,
  monthlyInterest: number,
  monthlyLoss: number,
  inflationPerMonth: number,
  monthsMomWorks: number,
  dadMonthlyIncome: number,
  monthsDadWorks: number
) {
  let months = 0;
  console.log("interest", monthlyInterest);
  const getAdjustedMonthlyLoss = () => {
    let loss = monthlyLoss;

    if (months > monthsMomWorks || months === 0) {
      loss += MOM_MONTHLY_INCOME + MOM_HEALTHCARE_MONTHLY;
    }

    if (months <= monthsDadWorks && monthsDadWorks !== 0) {
      loss -= dadMonthlyIncome;
    }

    const adjustedMonthlyLoss = loss * inflationPerMonth;
    const monthlyStockIncome = principal * monthlyInterest;

    return adjustedMonthlyLoss - monthlyStockIncome;
  };
  while (principal > 0) {
    principal -= getAdjustedMonthlyLoss();

    if (months > 400) {
      return 999999;
    }

    months++;
  }

  return months;
}

const yearsToMonths = (years: number) => years * 12;

const Input = ({
  val,
  setVal,
  label,
}: {
  val: number;
  setVal: (val: number) => void;
  label: string;
}) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={{ marginRight: "20px" }}>{label}</label>
    <input
      value={val}
      onChange={(e) => setVal(Number(e.target.value))}
      style={{ height: "50px" }}
    />
  </div>
);

const App = () => {
  const [principal, setPrincipal] = useState(PRINCIPAL);
  const [yearlyInterest, setYearlyInterest] = useState(YEARLY_INTEREST);
  const [monthlyLoss, setMonthlyLoss] = useState(MONTHLY_LOSS);
  const [inflationPerMonth, setInflationPerMonth] =
    useState(INFLATION_PER_MONTH);
  const [monthsMomWorks, setMonthsMomWorks] = useState(MONTHS_MOM_WORKS);
  const [dadMonthlyIncome, setDadMonthlyIncome] = useState(DAD_MONTHLY_INCOME);
  const [monthsDadWorks, setMonthsDadWorks] = useState(MONTHS_DAD_WORKS);

  const yearsRemaining =
    calculateYears(
      principal,
      yearlyInterest / 100 / 12,
      monthlyLoss,
      inflationPerMonth,
      monthsMomWorks,
      dadMonthlyIncome,
      monthsDadWorks
    ) / 12;
  console.log("years remaining", yearsRemaining);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>
        Estimated time left: {yearsRemaining.toFixed(0)} years,{" "}
        {Math.round(yearsToMonths(yearsRemaining % 1))} months
      </h2>
      <Input val={principal} setVal={setPrincipal} label="Principal" />
      <Input
        val={yearlyInterest}
        setVal={setYearlyInterest}
        label="Yearly Interest"
      />
      <Input val={monthlyLoss} setVal={setMonthlyLoss} label="Monthly Loss" />
      <Input
        val={inflationPerMonth}
        setVal={setInflationPerMonth}
        label="Inflation Per Month"
      />
      <Input
        val={monthsMomWorks}
        setVal={setMonthsMomWorks}
        label="Months Mom Works"
      />
      <Input
        val={dadMonthlyIncome}
        setVal={setDadMonthlyIncome}
        label="Dad Monthly Income"
      />
      <Input
        val={monthsDadWorks}
        setVal={setMonthsDadWorks}
        label="Months Dad Works"
      />
    </div>
  );
};

export default App;

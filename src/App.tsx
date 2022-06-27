import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const PRINCIPAL = 610000;
const YEARLY_INTEREST = 7.5;
const MONTHLY_EXPENSES = 10776;
const YEARLY_INFLATION = 4;
const MONTHS_MOM_WORKS = 60;
const DAD_MONTHLY_INCOME = 2000;
const MONTHS_DAD_WORKS = 0;
const DAD_SOCIAL_SECURITY = 1700;
export const MOM_MONTHLY_INCOME = 2000;
export const MOM_HEALTHCARE_MONTHLY = 300;

interface getMonthsRemainingProps {
  principal: number;
  yearlyInterest: number;
  monthlyExpenses: number;
  yearlyInflation: number;
  monthsMomWorks: number;
  dadMonthlyIncome: number;
  monthsDadWorks: number;
}

export function getMonthsRemaining({
  principal,
  yearlyInterest,
  monthlyExpenses,
  yearlyInflation,
  monthsMomWorks,
  dadMonthlyIncome,
  monthsDadWorks,
}: getMonthsRemainingProps) {
  let months = 0;
  // .955 accounts for the fact that it is compounded monthly
  const monthlyInterest = (yearlyInterest / 12 / 100) * 0.9555;
  const monthlyInflation = (yearlyInflation / 12 / 100) * 0.9555;
  const debuggingInfo = {};

  const getAdjustedMonthlyLoss = () => {
    let loss = monthlyExpenses;

    if (months < monthsMomWorks) {
      loss -= MOM_MONTHLY_INCOME;
    } else {
      // if she's not working she doesn't have healthcare
      loss += MOM_HEALTHCARE_MONTHLY;
    }

    if (months < monthsDadWorks) {
      loss -= dadMonthlyIncome;
    }

    loss -= DAD_SOCIAL_SECURITY;

    const inflationMultiplier = monthlyInflation * months;
    const adjustedMonthlyLoss = loss + loss * inflationMultiplier;
    const monthlyStockIncome = principal * monthlyInterest;
    debuggingInfo.monthlyStockIncome = monthlyStockIncome;

    return adjustedMonthlyLoss - monthlyStockIncome;
  };

  while (principal > 0) {
    let before = principal;
    principal -= getAdjustedMonthlyLoss();
    console.log(
      before,
      principal,
      before - principal,
      "stocks",
      debuggingInfo.monthlyStockIncome
    );

    if (months > 800) {
      return 999999;
    }

    months++;
  }

  return months;
}

const Input = ({
  val,
  setVal,
  label,
}: {
  val: number;
  setVal: (val: number) => void;
  label: string;
}) => (
  <div
    style={{
      marginBottom: "20px",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <label>{label}</label>
    <input
      value={val}
      onChange={(e) => setVal(Number(e.target.value))}
      style={{ height: "50px", padding: "0 15px" }}
    />
  </div>
);

const App = () => {
  const [principal, setPrincipal] = useState(PRINCIPAL);
  const [yearlyInterest, setYearlyInterest] = useState(YEARLY_INTEREST);
  const [monthlyExpenses, setMonthlyExpenses] = useState(MONTHLY_EXPENSES);
  const [yearlyInflation, setYearlyInflation] = useState(YEARLY_INFLATION);
  const [monthsMomWorks, setMonthsMomWorks] = useState(MONTHS_MOM_WORKS);
  const [dadMonthlyIncome, setDadMonthlyIncome] = useState(DAD_MONTHLY_INCOME);
  const [monthsDadWorks, setMonthsDadWorks] = useState(MONTHS_DAD_WORKS);

  const monthsRemaining = getMonthsRemaining({
    principal,
    yearlyInterest,
    monthlyExpenses,
    yearlyInflation,
    monthsMomWorks,
    dadMonthlyIncome,
    monthsDadWorks,
  });
  console.log("months remaining", monthsRemaining);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "900px",
        padding: "20px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <div>
        <h2>
          Estimated time left: {Math.floor(monthsRemaining / 12)} years,{" "}
          {monthsRemaining % 12} months.
        </h2>
      </div>
      <Input val={principal} setVal={setPrincipal} label="Principal" />
      <Input
        val={yearlyInterest}
        setVal={setYearlyInterest}
        label="Yearly Interest (percent)"
      />
      <Input
        val={monthlyExpenses}
        setVal={setMonthlyExpenses}
        label="Monthly Expenses"
      />
      <Input
        val={yearlyInflation}
        setVal={setYearlyInflation}
        label="Yearly Inflation (percent)"
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
      <p style={{ fontSize: "24px" }}>
        <i>
          See{" "}
          <a
            style={{ color: "blue" }}
            href="https://docs.google.com/spreadsheets/d/1Q1Jy1N2QsIwPYWO_WPOMGC7rftJU67rTPWa5-HEJMT4/edit#gid=1044987216"
          >
            here
          </a>{" "}
          for more info on how spending and income was calculated
        </i>
      </p>
    </div>
  );
};

export default App;

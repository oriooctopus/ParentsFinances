import { useState } from "react";
import "./App.css";
import {
  DAD_MONTHLY_INCOME,
  getMonthsRemaining,
  MONTHLY_EXPENSES,
  MONTHS_DAD_WORKS,
  MONTHS_MOM_WORKS,
  PRINCIPAL,
  YEARLY_INFLATION,
  YEARLY_INTEREST,
  MONTHS_UNTIL_BASEMENT_IS_RENTED,
} from "./getMonthsRemaining.tsx";

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
  const [monthsDadWorks, setMonthsDadWorks] = useState(MONTHS_DAD_WORKS);
  const [dadMonthlyIncome, setDadMonthlyIncome] = useState(DAD_MONTHLY_INCOME);
  const [monthsUntilBasementRented, setMonthsUntilBasementRented] = useState(
    MONTHS_UNTIL_BASEMENT_IS_RENTED
  );

  const monthsRemaining = getMonthsRemaining({
    principal,
    yearlyInterest,
    monthlyExpenses,
    yearlyInflation,
    monthsMomWorks,
    dadMonthlyIncome,
    monthsDadWorks,
    monthsUntilBasementRented,
  });

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
        val={monthsDadWorks}
        setVal={setMonthsDadWorks}
        label="Months Dad Works"
      />
      <Input
        val={dadMonthlyIncome}
        setVal={setDadMonthlyIncome}
        label="Dad Monthly Income"
      />
      <Input
        val={monthsUntilBasementRented}
        setVal={setMonthsUntilBasementRented}
        label="Months Until Basement Rented Out"
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

import {
  getMonthsRemaining,
  MOM_HEALTHCARE_MONTHLY,
  MOM_MONTHLY_INCOME,
} from "./getMonthsRemaining";

const defaultProps = {
  principal: 1000,
  yearlyInterest: 0,
  monthlyExpenses: 0,
  yearlyInflation: 0,
  monthsMomWorks: 0,
  dadMonthlyIncome: 0,
  monthsDadWorks: 0,
};

test("monthly loss", () => {
  expect(
    getMonthsRemaining({
      ...defaultProps,
      monthlyExpenses: 100,
    })
  ).toEqual(10);

  expect(
    getMonthsRemaining({
      ...defaultProps,
      monthlyExpenses: 1200,
    })
  ).toEqual(1);

  expect(
    getMonthsRemaining({
      ...defaultProps,
      monthlyExpenses: 100,
      yearlyInflation: 100,
    })
  ).toEqual(8);

  expect(
    getMonthsRemaining({
      ...defaultProps,
      principal: 1000,
      monthlyExpenses: MOM_MONTHLY_INCOME + MOM_HEALTHCARE_MONTHLY,
      monthsMomWorks: 100,
    })
  ).toEqual(101);

  expect(
    getMonthsRemaining({
      ...defaultProps,
      principal: 1,
      monthlyExpenses: 5,
      monthsDadWorks: 10,
      dadMonthlyIncome: 5,
    })
  ).toEqual(11);

  expect(
    getMonthsRemaining({
      ...defaultProps,
      principal: 100,
      monthlyExpenses: 20,
      yearlyInterest: 100,
    })
  ).toEqual(7);
});

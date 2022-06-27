export const PRINCIPAL = 610000;
export const YEARLY_INTEREST = 7.5;
export const MONTHLY_EXPENSES = 10776;
export const YEARLY_INFLATION = 4;
export const MONTHS_MOM_WORKS = 60;
export const DAD_MONTHLY_INCOME = 2500;
export const MONTHS_DAD_WORKS = 0;
export const DAD_SOCIAL_SECURITY = 1700;
export const MOM_MONTHLY_INCOME = 2000;
export const MOM_HEALTHCARE_MONTHLY = 300;
export const MOM_SOCIAL_SECURITY = 500;
export const MONTHS_UNTIL_BASEMENT_IS_RENTED = 999999;
export const INITIAL_BASEMENT_VALUE = 1200;
/**
 * Compounding per month is more lucrative than compounding per
 * year so we need to slightly lower the rate to compensate
 */
const YEARLY_TO_MONTHLY_COMPOUND_RATE_MULTIPLIER = 0.95555;

interface getMonthsRemainingProps {
  principal: number;
  yearlyInterest: number;
  monthlyExpenses: number;
  yearlyInflation: number;
  monthsMomWorks: number;
  dadMonthlyIncome: number;
  monthsDadWorks: number;
  monthsUntilBasementRented: number;
}

const getMonthlyRate = (yearlyRate: number) =>
  (yearlyRate / 12 / 100) * YEARLY_TO_MONTHLY_COMPOUND_RATE_MULTIPLIER;

export const getMonthsRemaining = ({
  principal,
  yearlyInterest,
  monthlyExpenses,
  yearlyInflation,
  monthsMomWorks,
  dadMonthlyIncome,
  monthsDadWorks,
  monthsUntilBasementRented,
}: getMonthsRemainingProps) => {
  let months = 0;
  const monthlyInterest = getMonthlyRate(yearlyInterest);
  const monthlyInflation = getMonthlyRate(yearlyInflation);
  const basementRentalMonthlyAppreciation = getMonthlyRate(5);
  const debuggingInfo = {};

  const getAdjustedMonthlyLoss = () => {
    let loss = monthlyExpenses;

    if (months >= monthsUntilBasementRented) {
      const basementMultiplier = months * basementRentalMonthlyAppreciation;
      const basementIncome =
        INITIAL_BASEMENT_VALUE + INITIAL_BASEMENT_VALUE * basementMultiplier;
      loss -= basementIncome;
      debuggingInfo.basementIncome = basementIncome;
    }

    if (months < monthsMomWorks) {
      loss -= MOM_MONTHLY_INCOME;
    } else {
      // if she's not working she doesn't have healthcare
      loss += MOM_HEALTHCARE_MONTHLY;
    }

    if (months < monthsDadWorks) {
      loss -= dadMonthlyIncome;
    }

    if (months > 12) {
      loss -= MOM_SOCIAL_SECURITY;
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
      "principal",
      principal,
      "loss",
      before - principal,
      "basement income",
      debuggingInfo.basementIncome,
      "stocks",
      debuggingInfo.monthlyStockIncome
    );

    if (months > 800) {
      return 999999;
    }

    months++;
  }

  return months;
};

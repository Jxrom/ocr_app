import { startOfWeek, getWeek } from "date-fns";

export const getWeekNumber = (date) => {
  const startOfTheWeek = startOfWeek(new Date(date), { weekStartsOn: 1 });
  return getWeek(startOfTheWeek);
};

export const aggregateWeeklyTotals = (dailyTotals) => {
  const weeklyTotals = {};

  dailyTotals.forEach(({ date, total }) => {
    const weekNumber = getWeekNumber(date);

    if (!weeklyTotals[weekNumber]) {
      weeklyTotals[weekNumber] = 0;
    }

    weeklyTotals[weekNumber] += total;
  });

  return weeklyTotals;
};

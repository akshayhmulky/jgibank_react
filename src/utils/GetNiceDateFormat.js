export const extractDateFromGivenFormat = (transactionDate) => {
  const isoDateString = transactionDate;
  const date = new Date(isoDateString);

  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return formattedDate;
};

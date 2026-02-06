export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("ru")} ${date.toLocaleTimeString("ru")}`;
};

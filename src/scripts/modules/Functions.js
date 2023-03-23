export const isDarkMode = () => {
  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    return "dark";
  } else {
    return "light";
  }
};

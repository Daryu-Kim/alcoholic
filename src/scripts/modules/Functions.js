import { toast } from "vue3-toastify";

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

export const toastError = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
    theme: isDarkMode(),
  });
};

export const setRefreshCookie = (tableID, tableNum) => {
  const expireTime = new Date();
  expireTime.setTime(expireTime.getTime() + 3600000);
  document.cookie = `TABLE_ID=${escape(
    tableID
  )}; path=/; expires=${expireTime};`;
  document.cookie = `TABLE_NUM=${escape(
    tableNum
  )}; path=/; expires=${expireTime};`;
  return expireTime;
};

export const getRefreshCookie = () => {
  const cList = ["TABLE_ID=", "TABLE_NUM="];
  var cResult = [];
  for (let index in cList) {
    var cName = cList[index];
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = "";
    if (start != -1) {
      start += cName.length;
      var end = cookieData.indexOf(";", start);
      if (end == -1) end = cookieData.length;
      cValue = cookieData.substring(start, end);
      cValue = unescape(cValue);
    }
    cResult.push(cValue);
  }
  return cResult;
};

export function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=0;`;
}

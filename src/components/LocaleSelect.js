import { useLocale, useSetLocale } from "./context/LocaleContext";

function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleSelect = (e) => {
    setLocale(e.target.value);
  };

  return (
    <select value={locale} onChange={handleSelect}>
      <option value="ko">한국어</option>
      <option value="en">영어</option>
    </select>
  );
}

export default LocaleSelect;

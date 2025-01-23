import { useState } from "react";

function useAsync(asyncFunction) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const wrappedFunction = async (...args) => {
    try {
      setPending(true);
      setError(null);
      return await asyncFunction(...args);
    } catch (e) {
      setError(e);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}

export default useAsync;

import React from "react";

function useEscapeKey(callback) {
	React.useEffect(() => {
		function handleEvent(event) {
			if (event.key === "Escape") {
				callback(event);
			}
		}

		document.addEventListener("keydown", handleEvent);

		return () => document.removeEventListener("keydown", handleEvent);
	}, [callback]);
}

export default useEscapeKey;

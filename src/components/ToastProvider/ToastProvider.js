import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
	const [toastList, setToastList] = React.useState([]);

	const createToast = React.useCallback(function (message, variant) {
		setToastList((currentToastList) => {
			return [
				...currentToastList,
				{
					message,
					variant,
					id: crypto.randomUUID(),
				},
			];
		});
	}, []);

	const dismissToast = React.useCallback(function (id) {
		setToastList((currentToastList) =>
			currentToastList.filter((toast) => toast.id !== id),
		);
	}, []);

	React.useEffect(() => {
		function handleEvent(event) {
			if (event.key === "Escape") {
				setToastList([]);
			}
		}

		document.addEventListener("keydown", handleEvent);

		return () => document.removeEventListener("keydown", handleEvent);
	}, []);

	const value = React.useMemo(
		() => ({
			toastList,
			createToast,
			dismissToast,
		}),
		[toastList, createToast, dismissToast],
	);

	return (
		<ToastContext.Provider value={value}>{children}</ToastContext.Provider>
	);
}

export default ToastProvider;

import React from "react";

import useEscapeKey from "../../hooks/useEscapeKey";

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

	const dismissAllToast = React.useCallback(function () {
		setToastList([]);
	}, []);

	useEscapeKey(dismissAllToast);

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

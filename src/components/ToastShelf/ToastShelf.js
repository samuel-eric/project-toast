import React from "react";

import Toast from "../Toast";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
	const { toastList } = React.useContext(ToastContext);

	return (
		<ol
			className={styles.wrapper}
			role="region"
			aria-live="polite"
			aria-label="Notification"
		>
			{toastList.map(({ id, variant, message }) => (
				<li className={styles.toastWrapper} key={id}>
					<Toast variant={variant} id={id}>
						{message}
					</Toast>
				</li>
			))}
		</ol>
	);
}

export default ToastShelf;

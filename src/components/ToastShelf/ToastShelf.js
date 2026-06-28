import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toastList, handleDismiss }) {
	return (
		<ol className={styles.wrapper}>
			{toastList.map(({ id, variant, message }) => (
				<li className={styles.toastWrapper} key={id}>
					<Toast variant={variant} handleDismiss={() => handleDismiss(id)}>
						{message}
					</Toast>
				</li>
			))}
		</ol>
	);
}

export default ToastShelf;

import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
	const [message, setMessage] = React.useState("");
	const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
	const [toastList, setToastList] = React.useState([]);

	function handleSubmit(event) {
		event.preventDefault();
		const nextToastList = [...toastList];
		nextToastList.push({
			message,
			variant,
			id: crypto.randomUUID(),
		});
		setToastList(nextToastList);

		setMessage("");
		setVariant(VARIANT_OPTIONS[0]);
	}

	function handleDismiss(id) {
		const nextToastList = toastList.filter((toast) => toast.id !== id);
		setToastList(nextToastList);
	}

	return (
		<div className={styles.wrapper}>
			<header>
				<img alt="Cute toast mascot" src="/toast.png" />
				<h1>Toast Playground</h1>
			</header>

			<ToastShelf toastList={toastList} handleDismiss={handleDismiss} />

			<form className={styles.controlsWrapper} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label
						htmlFor="message"
						className={styles.label}
						style={{ alignSelf: "baseline" }}
					>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							id="message"
							className={styles.messageInput}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							required
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						{VARIANT_OPTIONS.map((option) => (
							<label htmlFor={`variant-${option}`} key={`variant-${option}`}>
								<input
									id={`variant-${option}`}
									type="radio"
									name="variant"
									value={option}
									checked={variant === option}
									onChange={(event) => setVariant(event.target.value)}
								/>
								{option}
							</label>
						))}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ToastPlayground;

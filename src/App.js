import React, { useState, useEffect } from "react";

const useStateWithLocalStorage = localStorageKey => {
	const [billingPeriod, setBillingPeriod] = React.useState(
		localStorage.getItem(localStorageKey) || ""
	);
	useEffect(() => {
		localStorage.setItem(localStorageKey, billingPeriod);
	}, [billingPeriod, localStorageKey]);
	return [billingPeriod, setBillingPeriod];
};

const App = () => {
	const [totalBill, setTotalBill] = useState("");
	const [savings, setSavings] = useState(0);
	const [kwPh, setKwph] = useState(0);

	const [billingPeriod, setBillingPeriod] = useStateWithLocalStorage(
		"myValueInLocalStorage"
	);
	console.log("local" + billingPeriod);

	//LPE Fields
	const tarifOriginal = 0.31;
	const tarifLpe = 0.24;

	useEffect(() => {
		//KWPH Original
		if (!totalBill) {
			setKwph(0);
			setSavings(0);
		} else {
			setKwph((totalBill - billingPeriod) / tarifOriginal);
			// Total Bill LPE
			let totalBillLpe = tarifLpe * kwPh + billingPeriod;
			//Savings
			setSavings(totalBill - totalBillLpe - billingPeriod);
		}

		console.log("total" + totalBill);
		console.log("period" + billingPeriod);
		console.log("kw" + kwPh);
		console.log("savings" + savings);
	}, [totalBill, billingPeriod, kwPh, savings]);

	const handleSubmit = evt => {
		evt.preventDefault();
	};

	const onChange = event => {
		setBillingPeriod(event.target.value);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "4rem" }}>
			<h1>Energy Saving Calculator</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Enter Total Bill:
					<input
						type="text"
						value={totalBill}
						onChange={e => {
							setTotalBill(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					Enter Billing Period:
					<select value={billingPeriod} onChange={onChange}>
						<option selected="Select Billing Period">Select Billing Period</option>
						<option value="30">30</option>
						<option value="60">60</option>
						<option value="90">90</option>
					</select>
				</label>
			</form>
			<h2>{`Your KWPH are ${kwPh.toFixed(2)}`}</h2>
			<h2>{`You could save $${savings.toFixed(2)} per ${billingPeriod} days`}</h2>
		</div>
	);
};

export default App;

import HomePage from "./HomePage.js";
import CounterPage from "./CounterPage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const counter = () => new CounterPage(main);

	return {
		home,
		counter,
	};
};
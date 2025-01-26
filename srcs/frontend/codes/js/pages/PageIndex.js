import HomePage from "./HomePage.js";
import CounterPage from "./CounterPage.js";
import FriendPage from "./FriendPage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const counter = () => new CounterPage(main);
	const friend = () => new FriendPage(main);

	return {
		home,
		counter,
		friend,
	};
};
import HomePage from "./HomePage.js";
import CounterPage from "./CounterPage.js";
import FriendPage from "./FriendPage.js";
import LoginPage from "./LoginPage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const counter = () => new CounterPage(main);
	const friend = () => new FriendPage(main);
	const login = () => new LoginPage(main);

	return {
		home,
		counter,
		friend,
		login,
	};
};
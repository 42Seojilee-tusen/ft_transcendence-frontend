import HomePage from "./HomePage.js";
import MyPage from "./MyPage.js";
import FriendPage from "./FriendPage.js";
import LoginPage from "./LoginPage.js";
import CallbackPage from "./CallbackPage.js";
import GamePage from "./GamePage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const login = () => new LoginPage(main);
	const myPage = () => new MyPage(main);
	const friend = () => new FriendPage(main);
	const callback = () => new CallbackPage(main);
	const game = () => new GamePage(main);

	return {
		home,
		login,
		myPage,
		friend,
		callback,
		game,
	};
};

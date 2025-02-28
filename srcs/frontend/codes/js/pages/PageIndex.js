import HomePage from "./HomePage.js";
import MyPage from "./MyPage.js";
import LoginPage from "./LoginPage.js";
import CallbackPage from "./CallbackPage.js";
import TwoFaPage from "./TwoFaPage.js";
import GamePage from "./GamePage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const login = () => new LoginPage(main);
	const myPage = () => new MyPage(main);
	const callback = () => new CallbackPage(main);
	const twofa = () => new TwoFaPage(main);
	const game = () => new GamePage(main);

	return {
		home,
		login,
		myPage,
		callback,
		twofa,
		game,
	};
};

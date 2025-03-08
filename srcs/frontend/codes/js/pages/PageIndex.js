import HomePage from "./HomePage.js";
import MyPage from "./MyPage.js";
import LoginPage from "./LoginPage.js";
import CallbackPage from "./CallbackPage.js";
import TwoFaPage from "./TwoFaPage.js";
import BattlePage from "./BattlePage.js";
import TournamentPage from "./TournamentPage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const login = () => new LoginPage(main);
	const myPage = () => new MyPage(main);
	const callback = () => new CallbackPage(main);
	const twofa = () => new TwoFaPage(main);
	const battle = () => new BattlePage(main);
	const tournament = () => new TournamentPage(main);

	return {
		home,
		login,
		myPage,
		callback,
		twofa,
		battle,
		tournament,
	};
};

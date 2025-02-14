import HomePage from "./HomePage.js";
import CounterPage from "./CounterPage.js";
import FriendPage from "./FriendPage.js";
import LoginPage from "./LoginPage.js";
import CallbackPage from "./CallbackPage.js";
import GamePage from "./GamePage.js";
import TwoFaPage from "./TwoFaPage.js";
import LoadingPage from "./LoadingPage.js";
import BattlePage from "./BattlePage.js";
import TournamentPage from "./TournamentPage.js";

export default (main) => {
	const home = () => new HomePage(main);
	const login = () => new LoginPage(main);
	const counter = () => new CounterPage(main);
	const friend = () => new FriendPage(main);
	const callback = () => new CallbackPage(main);
	const game = () => new GamePage(main);
	const twofa = () => new TwoFaPage(main);
	const loading = () => new LoadingPage(main);
	const battle = () => new BattlePage(main);
	const tournament = () => new TournamentPage(main);

	return {
		home,
		login,
		counter,
		friend,
		callback,
		game,
		twofa,
		loading,
		battle,
		tournament,
	};
};
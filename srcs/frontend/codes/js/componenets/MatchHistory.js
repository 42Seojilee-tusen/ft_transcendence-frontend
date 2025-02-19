import Component from "../core/Component.js";
import DetailMatchHistory from "./MyPage/DetailMatchHistory.js";

export default class MatchHistory extends Component {

	setup() {
		const username = this.$props;
		this.$state = {
			histories: this.getHistories(),
			// $props에 담긴 객체의 key value로 초기화
			//histories: requestApi("https://localhost/api/games/me", {
			//	method: "GET",
			//	credentials: "include",
			//}).then((response) => {return response.json()})
			//.then((response) => {return response}),
		}
	}

	template() {
		return `
		<div class="row">
			<!--중앙 통계 정보 -->
			<div class="col-lg-4 p-4">
			</div>

			<!-- 우측 경기 정보 -->
			<div class="col-lg-8 text-center p-4">
				<div id="my-SimpleHistory" class="m-2 m-md-3 m-lg-4">
					전적
					<div class="row row-cols-2 m-0">
						<div>
							<h6 class="m-1">배틀</h5>
							<h6 id="matchHistory-battle" class="m-1">100전 100승 0패</h5>
						</div>
						<div>
							<h6 class="m-1">토너먼트</h5>
							<h6 id="matchHistory-tournament" class="m-1">90경기 42/42/4/2 </h5>
						</div>
					</div>
				</div>
				<div class="flex-grow-1 m-2 m-md-3 m-lg-4">
					<div id="my-DetailHistories" class="m-0 overflow-auto">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {

	// < 중앙 경기 정보 >


	// < 우측 경기 정보 >
		// 경기 기록 축약본
			// my battle history
		//setBattleHistory();

			// my tournament history
		//setTournamentHistory();

		// 경기 기록들.
			// my histories array
		const histories = this.$state.histories.match_history;

			// match History 생성
		const $matchRecord = document.querySelector("div#my-DetailHistories");

		histories.forEach((record) => {
			new DetailMatchHistory($matchRecord, record);
		});
	}

	setBattleHistory() {
		const $battle = document.querySelector("div#my-SimpleHistory div#matchHistory-battle");
		const history = this.$state.histories.total_match_history[0];

		const totalGame = history.total_match;
		const win = history.win;
		const lose = history.lose;

		$battle.innerText = `${totalGame}전 ${win}승 ${lose}패`;
	}

	setTournamentHistory() {
		const $tournament = document.querySelector("div#my-SimpleHistory div#matchHistory-tournament");
		const history = this.$state.histories.total_match_history[0];

		const totalGame = history.total_match;
		const win = history.win;
		const lose = history.lose;

		$tournament.innerText = `${totalGame}전 ${win}승 ${lose}패`;
	}

	/* api 연동해서 부모로부터 props로 histories 받아올 시 삭제 할 function */
	getHistories() {
		return {match_history: [
			{ date: [25, 2, 1], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 2], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 3], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 4], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 5], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 6], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 7], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 8], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 9], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 10], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 11], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 12], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 13], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 14], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 15], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 16], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 17], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 18], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 19], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 20], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 21], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 22], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 23], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 24], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 25], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 26], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 27], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
			{ date: [25, 2, 28], match_type: "배틀", enemy: "seojilee", score: [4, 2], result: "win" },
			{ date: [25, 2, 29], match_type: "배틀", enemy: "seojilee", score: [2, 4], result: "lose" },
			{ date: [25, 2, 30], match_type: "토너먼트", enemy: { "player1": "seojilee", "player2": "taejeong", "player3": "hyoengsh", "player4": "junhapar", }, result: "win" },
		]};
	}
}

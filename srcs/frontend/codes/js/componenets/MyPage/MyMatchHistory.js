import Component from "../../core/Component.js";
import DetailMatchHistory from "./DetailMatchHistory.js";
import { requestApi } from "../core/requestApi.js";

export default class MyMatchHistory extends Component {

	setup() {
		this.$state = {
			// 임시 경기 기록
			//histories: this.getHistories(),

			// $props에 담긴 객체의 key value로 초기화
			histories: requestApi("https://localhost/api/games/me", {
				method: "GET",
				credentials: "include",
			}).then((response) => {return response.json()})
			.then((response) => {return response}),
		}
	}

	template() {
		return `
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
		`;
	}

	mounted() {

		// my battle history
		setBattleHistory();

		// my tournament history
		setTournamentHistory();

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
		return [
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.04", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.05", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.06", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.07", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.08", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.09", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.10", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.11", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.12", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.13", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.14", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.15", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.16", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.17", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.18", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.19", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.20", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.21", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.22", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.23", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.24", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.25", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.26", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.27", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.28", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.29", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.30", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
		];
	}
}

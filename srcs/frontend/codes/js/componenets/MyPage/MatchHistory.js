import Component from "../../core/Component.js";
import DetailMatchHistory from "./DetailMatchHistory.js";
import AdditionalMyInfo from "./AdditionalMyInfo.js";
import FriendProfile from "./FriendProfile.js";
import { requestApi } from "../../core/requestApi.js";

export default class MatchHistory extends Component {

	constructor($target, username) {
		// username이 없으면 초기화를 중단
		if (username === undefined) {
			return;
		}
		super($target, username);
		this.fetchMatchHistory();
	  }

	setup() {
		this.$state = {
			username: this.$props,
			histories: null,
		}
	}

	template() {
		return `
		<div class="row w-100">
			<div class="col-lg-8 text-center p-4 w-100">
				<div id="simpleHistory" class="m-2 m-md-3 m-lg-4">
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
					<div id="detailHistories" class="m-0">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		if (this.$state.histories !== null) {
			// < 우측 경기 정보 >
				// 경기 기록 축약본
				// my battle history
			this.setBattleHistory();

				// my tournament history
			this.setTournamentHistory();

				// 경기 기록들.
					// my histories array
			const histories = this.$state.histories.match_history;

				// match History 생성
			const $matchRecord = document.querySelector("div#detailHistories");
			const fragment = document.createDocumentFragment();

				// fragment에 history들을 추가해두고
			histories.forEach((record) => {
				new DetailMatchHistory(fragment, record);
			});
				// 한 번에 DOM에 추가
			$matchRecord.appendChild(fragment);
		}
	}

	setBattleHistory() {
		const $battle = document.querySelector("div#simpleHistory h6#matchHistory-battle");
		const history = this.$state.histories.total_match_history[0];

		const totalGame = history.total_match;
		const win = history.win;
		const lose = history.lose;

		$battle.innerText = `${totalGame}전 ${win}승 ${lose}패`;
	}

	setTournamentHistory() {
		const $tournament = document.querySelector("div#simpleHistory h6#matchHistory-tournament");
		const history = this.$state.histories.total_match_history[1];

		const totalGame = history.total_match;
		const win = history.win;
		const lose = history.lose;

		$tournament.innerText = `${totalGame}전 ${win}승 ${lose}패`;
	}

	async fetchMatchHistory() {
		try {
			const response = await requestApi(`https://localhost/api/games/${this.$state.username}/`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			this.setState({histories : data });
		} catch (error) {
			console.error("Error fetching /api/games/${this.$state.username}/:", error);
		}
	}
}

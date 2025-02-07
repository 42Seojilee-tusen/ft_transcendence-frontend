import Component from "../../core/Component.js";
import MatchRecord from "./MatchRecord.js";

export default class MyMatchHistory extends Component {

	template() {
		return `
		<div class="m-2 m-md-3 m-lg-4">
			전적
			<div class="row row-cols-2 m-0">
				<div>
					<h6 class="m-1">배틀</h5>
					<h6 class="m-1">100전 100승 0패</h5>
				</div>
				<div>
					<h6 class="m-1">토너먼트</h5>
					<h6 class="m-1">90경기 42/42/4/2 </h5>
				</div>
			</div>
		</div>
		<div class="flex-grow-1 m-2 m-md-3 m-lg-4">
			<div id="match-records" class="m-0 overflow-auto">
			</div>
		</div>
		`;
	}

	mounted() {

		const records = [
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win" },
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose" },
			{ date: "25.02.03", type: "토너먼트", enemy: '["a", "b", "c"]', score: '["3", "1", "2"]', winOrLose: "3" },
		];

		const $matchRecord = document.querySelector("#match-records");

		// 목록 생성
		records.forEach((record, index) => {
			let type;
			let score;
			let rank;
			if (record.type === "배틀")	{
				type = "vs " + record.enemy;
				score = record.score;
				rank = record.winOrLose;
			} else {
				type = record.type;
				let arrEnemy = JSON.parse(record.enemy);
				let arrRank = JSON.parse(record.score);
				score = `
					${arrRank[0] + ". " + arrEnemy[0]}<br>
					${arrRank[1] + ". " + arrEnemy[1]}<br>
					${arrRank[2] + ". " + arrEnemy[2]}<br>
				`;
				rank = record.winOrLose + "등";
			}

			const recordLayout = `
				<div class="d-flex flex-column justify-content-center align-items-center">
					<div class="m-1">
						${record.date}
					</div>
					<div class="m-1">
						${type}
					</div>
				</div>
				<div class="d-flex flex-column justify-content-center align-items-center">
					${score}
				</div>
				<div class="d-flex flex-column justify-content-center align-items-center">
					${rank}
				</div>
			`;
			const recordItem = document.createElement("div");
			recordItem.classList.add("row", "row-cols-3", "m-1", "m-md-2", "m-lg-3");
			recordItem.id = "match-record";
			recordItem.innerHTML = recordLayout;
			$matchRecord.appendChild(recordItem);
		});
	}
}

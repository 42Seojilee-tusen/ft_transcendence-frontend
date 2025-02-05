import Component from "../core/Component.js";

export default class MyMatchHistory extends Component {

	template() {
		return `
		<div class="m-2 m-md-3 m-lg-4">
			전적
			<div class="row m-0">
				<div class="col p-0 d-flex flex-column justify-content-center align-items-center">
					<h6 class="m-1 text break">배틀</h5>
					<h6 class="m-1 text break">100전 100승 0패</h5>
				</div>
				<div class="col p-0 d-flex flex-column justify-content-center align-items-center">
					<h6 class="m-1 text break">토너먼트</h5>
					<h6 class="m-1 text break">90경기 42/42/4/2 </h5>
				</div>
			</div>
		</div>
		<div class="flex-grow-1 m-2 m-md-3 m-lg-4 text-break">
			<div id="match-records">
			</div>
		</div>
		`;
	}

	mounted() {

		const records = [
			{ date: "25.02.01", type: "배틀", enemy: "seojilee", score: "4:2", winOrLose: "win"},
			{ date: "25.02.02", type: "배틀", enemy: "seojilee", score: "2:4", winOrLose: "lose"},
			{ date: "25.02.03", type: "토너먼트", enemy: [a, b, c], score: [3, 1, 2], winOrLose: "3"},
		];

		const $matchRecord = document.querySelector("#match-records");

		// 목록 생성
		friends.forEach((friend, index) => {
			const friendItem = document.createElement("div");
			friendItem.classList.add("list-group-item", "friend-item");
			friendItem.textContent = friend.name;
			friendItem.dataset.index = index;

			// 클릭 이벤트 추가
			friendItem.addEventListener("click", () => {
				friendDetailComponent.setFriend(friend);
			});

			$friendListEl.appendChild(friendItem);
		});
	}
}

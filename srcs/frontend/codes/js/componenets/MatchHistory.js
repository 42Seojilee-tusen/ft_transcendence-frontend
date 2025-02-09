import Component from "../core/Component.js";

export default class MatchHistory extends Component {
	setup() {
		this.$state= {
			// $props에 담긴 객체의 key value로 초기화
		}

	}

	template() {
		return `
			<div class="row">
				<!--중앙 통계 정보 -->
				<div class="col-lg-4 p-4">
				</div>

				<!-- 우측 친구 정보 -->
				<div class="col-lg-8 p-4">
					<h2>친구 정보</h2>
					<div id="friend-details" class="border p-3 rounded"></div>
				</div>
			</div>
		`;
	}

	mounted() {

	}
}

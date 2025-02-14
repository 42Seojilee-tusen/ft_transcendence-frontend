import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class BattlePage extends Component {
	setup() {
		requestApi("https://localhost/api/users/hyeongsh", {
			method: "GET",
			credentials: "include",
		}).then(test => console.log(test.json()));
		requestApi("https://localhost/api/users/choolee", {
			method: "GET",
			credentials: "include",
		}).then(test => console.log(test.json()));
		this.$state = {

		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">Battle</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						src="../../img/1on1.png"
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
					/>
					<h3 class="text-white mb-0">player1</p>
				</div>
				<div class="col d-flex align-items-center justify-content-center"><h1 style="font-size: clamp(1rem, 5vw, 4rem);">VS</h1></div>
				<div class="col d-flex flex-column align-items-center justify-content-center">
					<img
						src="../../img/1on1.png"
						alt="Sample Image"
						class="img-fluid mb-2"
						style="max-width: 100%; height: auto;"
					/>
					<h3 class="text-white mb-0">player2</p>
				</div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}
}
import Component from "../core/Component.js";
import QrCode from "../componenets/QrCode.js";
import AuthNumber from "../componenets/AuthNumber.js";

export default class TwoFaPage extends Component {
	setup() {
		this.$state = {
			twofa: true,
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1"></div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div id="qrCode" class="col-5 d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div id="authNumber" class="col-8 d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1"></div>
			<div class="row d-flex flex-grow-1"></div>
		</div>
		`;
	}

	mounted() {
		const $qrCode = document.querySelector("#qrCode");
		const $authNumber = document.querySelector("#authNumber");

		const qrCode = new QrCode($qrCode);
		const authNumber = new AuthNumber($authNumber);
	}
}

import Component from "../core/Component.js";

export default class QrCode extends Component {
	template() {
		return `
		<div>
			<div class="row">
				<img src="../../img/test_qr.png" class="img-fluid" alt="대체 qr">
			</div>
			<div class="row">
				<div class="text-center">QR CODE 재요청</div>
			</div>
		</div>
		`;
	}

	mounted() {
		
	}

}
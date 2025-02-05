import Component from "../core/Component.js";

export default class QrCode extends Component {
	template() {
		return `
		<img src="../../img/test_qr.png" class="img-fluid" alt="대체 qr"></img>
		`;
	}

}
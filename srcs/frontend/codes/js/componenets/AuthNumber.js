import Component from "../core/Component.js";

export default class AuthNumber extends Component {
	template() {
		return `
		<div id="auth-container">
			<input type="text" class="auth-input" maxlength="1">
			<input type="text" class="auth-input" maxlength="1">
			<input type="text" class="auth-input" maxlength="1">
			<input type="text" class="auth-input" maxlength="1">
			<input type="text" class="auth-input" maxlength="1">
			<input type="text" class="auth-input" maxlength="1">
		</div>
		`;
	}

	mounted() {
		document.addEventListener("DOMContentLoaded", () => {
			const inputs = document.querySelectorAll(".auth-input");
		
			inputs.forEach((input, index) => {
				input.maxLength = 1;
		
				input.addEventListener("input", (e) => {
					if (e.target.value && index < inputs.length - 1) {
						inputs[index + 1].focus();
					}
				});
		
				input.addEventListener("keydown", (e) => {
					if (e.key === "Backspace" && !e.target.value && index > 0) {
						inputs[index - 1].focus();
					}
				});
			});
		
			inputs[inputs.length - 1].addEventListener("keyup", (e) => {
				if (e.key === "Enter") {
					const code = Array.from(inputs).map(input => input.value).join("");
					if (code.length === 6) {
						console.log("✅ 서버로 전송:", code);
						// fetch("서버URL", { method: "POST", body: JSON.stringify({ code }) })
					}
				}
			});
		});
	}

}
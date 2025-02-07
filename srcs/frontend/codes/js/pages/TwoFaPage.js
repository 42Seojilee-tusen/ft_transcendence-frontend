import Component from "../core/Component.js";
import { requestApi } from "../core/requestApi.js";

export default class TwoFaPage extends Component {
	setup() {
		this.$state = {
			twofa: true,
		};
	}

	template() {
		return `
		<div class="container vh-100 d-flex flex-column">
			<div class="row d-flex flex-grow-1">
				<h1 class="col text-white d-flex align-items-center justify-content-center">2-Factor-authentication</h1>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center">
					<div>
						<div id="qrcode" class="row"></div>
						<div class="row">
							<h3 id="qrReload" class="text-center text-white h3-clickable">QR CODE 요청<h3>
						</div>
					</div>
				</div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div id="authNumber" class="col-8 d-flex align-items-center justify-content-center">
					<div id="auth-container">
						<input type="text" class="auth-input" maxlength="1">
						<input type="text" class="auth-input" maxlength="1">
						<input type="text" class="auth-input" maxlength="1">
						<input type="text" class="auth-input" maxlength="1">
						<input type="text" class="auth-input" maxlength="1">
						<input type="text" class="auth-input" maxlength="1">
					</div>
				</div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
			<div class="row d-flex flex-grow-1"></div>
			<div class="row d-flex flex-grow-1"></div>
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

		async function qrRouteFind() {
			try {
				const response = await requestApi("https://localhost/api/oauth/2fa", {
					method: "GET",
            		credentials: "include",  // 🔥 쿠키 포함하여 요청
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`QR 코드 루트 탐색 실패: ${errorData.error || response.status}`);
				}
		
				const data = await response.json();
				console.log("✅ QR 코드 루트 응답:", data);
				return data.two_factor_qr_code_image;
			} catch (error) {
				throw error;
			}
		}

		async function loadQrImage() {
			try {
				const route = await qrRouteFind();

				const $qrcode = document.querySelector("#qrcode");
				const $beforeImage = $qrcode.querySelector("img");
				if ($beforeImage) {
					$qrcode.removeChild($beforeImage);
				}
				const img = document.createElement("img");
				img.src = `https://localhost/api${route}`;
				img.alt = "QR Image";
				$qrcode.appendChild(img);
			} catch (error) {
				console.error("❌ QR 실패:", error);
			}
		}

		const $qrReload = document.querySelector("#qrReload");
		$qrReload.addEventListener("click", loadQrImage);
	}
}

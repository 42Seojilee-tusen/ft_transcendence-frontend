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
							<p id="qrReload" class="text-center multi-line-text h3-clickable">QR CODE 요청<h3>
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
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center">
					<p class="text-center multi-line-text">
						인증앱에서 제공하는 코드 6자리를 입력하세요.<br>
						만약 인증앱에 핑퐁게임이 등록되어 있지 않다면,<br>
						QR CODE 요청을 클릭하여 등록 QR CODE를 발급 받으세요.<br>
						QR CODE 재발급 시 이전에 등록된 QR CODE로는 로그인할 수 없습니다.<br>
					<p>
				</div>
			</div>
			<div class="row d-flex flex-grow-1"></div>
		</div>
		`;
	}

	mounted() {
		const inputs = document.querySelectorAll(".auth-input");
		inputs[0].focus();
		inputs.forEach((input, index) => {
			input.maxLength = 1;

			input.addEventListener("keydown", (e) => {
				if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
					e.preventDefault(); // 숫자가 아니면 입력 차단
				}
				if (e.key === "Backspace" && !e.target.value && index > 0) {
					inputs[index - 1].focus();
				}
				if (e.target.value && index < inputs.length - 1) {
					inputs[index + 1].focus();
				}
			});
		});

		inputs[inputs.length - 1].addEventListener("keyup", async (e) => {
			if (e.key === "Enter") {
				const otpCode = Array.from(inputs).map(input => input.value).join("");
				if (otpCode.length === 6) {
					try {
						console.log("✅ 서버로 전송:", otpCode);
						const response = await requestApi("https://localhost/api/oauth/2fa/", {
							method: "POST",
							credentials: "include",
							body: JSON.stringify({ "otp_code" : otpCode })
						});
						console.log(response);
						const data = await response.json();
						if (!response.ok) {
							throw new Error(`2fa 요청 실패: ${data.error || response.status}`);
						}
						sessionStorage.setItem("accessToken", data.access_token);
						window.location.replace("https://localhost");
					} catch (error) {
						console.log(error);
						alert(error);
					}
				}
			}
		});

		async function qrRouteFind() {
			try {
				const response = await requestApi("https://localhost/api/oauth/2fa/", {
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

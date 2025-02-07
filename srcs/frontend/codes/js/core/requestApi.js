// ✅ 액세스 토큰 갱신 함수
async function refreshAccessToken() {
    try {
        const response = await fetch("https://localhost/api/oauth/token/refresh", {
            method: "POST",
            credentials: "include",  // 🔥 쿠키 포함하여 요청
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`리프레시 토큰 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        sessionStorage.setItem("accessToken", data.access_token);  // ✅ 새 액세스 토큰 저장
        console.log("✅ 새 액세스 토큰 발급 완료:", data.access_token);
        return data.access_token;
    } catch (error) {
        console.error("❌ 액세스 토큰 갱신 실패:", error);
        throw error;
    }
}

// ✅ API 요청을 보내면서 액세스 토큰을 자동 갱신하는 함수
export async function requestApi(url, options = {}) {
    try {
        let accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            console.warn("⚠️ 액세스 토큰이 없음. 새 토큰 요청...");
            accessToken = await refreshAccessToken(); // ✅ 새 액세스 토큰 요청
        }

        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        // 🔥 액세스 토큰이 만료되었을 경우 (401 응답)
        if (response.status === 401) {
            console.warn("⚠️ 액세스 토큰 만료됨. 새 토큰 요청...");
            accessToken = await refreshAccessToken();
            
            // 🔥 새로운 액세스 토큰을 사용하여 요청 재시도
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
        }

        return response;
    } catch (error) {
        console.error("❌ api 요청 실패:", error);
        window.location.hash = "#/login";
    }
}

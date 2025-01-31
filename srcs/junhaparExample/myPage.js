mainDiv =  document.querySelector("div.main");
//let startPageBtn = document.querySelector("i#myPageToStartPage");

//console.log(startPageBtn);

function functionStartPageBtn(event) {
	const template = `
		<div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
			<div class="row d-flex justify-content-center align-items-center">
				<button class="btn btn-success">로컬 플레이</button>
				<button class="btn btn-success">온라인 매치</button>
				<button class="btn btn-success">친구 관리</button>
				<button class="btn btn-success myPageBtn">마이 페이지</button>
			</div>
		</div>
	`
	mainDiv.innerHTML = template;

	myPageBtn = document.querySelector("button.myPageBtn");
	myPageBtn.addEventListener('click', functionMyPageBtn);
}

//startPageBtn.addEventListener('click', functionStartPageBtn);

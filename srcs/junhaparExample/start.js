let mainDiv =  document.querySelector("div.main");
let myPageBtn = document.querySelector("button.myPageBtn");

function functionMyPageBtn(event) {
	const template = `
		<div class="container-fluid min-vw-100 min-vh-100">
			<div class="row min-vh-100">
				<div class="col-1 min-vh-100 d-flex justify-content-center">
					<i id="myPageToStartPage" class="bi bi-arrow-left"></i>
					<svg id="myPageToStartPage" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
					</svg>
				</div>
				<div class="col-7 min-vh-100">
				</div>
				<div class="col-1 min-vh-100">
				</div>
				<div class="col-3 min-vh-100">
				</div>
			</div>
		</div>
	`
	mainDiv.innerHTML = template;

	let startPageBtn = document.querySelector("svg#myPageToStartPage");
	startPageBtn.addEventListener('click', functionStartPageBtn);
}

myPageBtn.addEventListener('click', functionMyPageBtn);

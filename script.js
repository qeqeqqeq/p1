const getGenresList = async () => {
	try {
		const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres`;
		const response = await fetch(url);
		const data = response.json();
		return data;
	} catch (err) {
		console.log("err", err);
	}
};


const renderGenres = async () => {
	try {
		const response = await getGenresList();
		const genresList = document.querySelector(".genre-browse");
		const ulGenresList = genresList.children[1];
		ulGenresList.innerHTML = "";
		response.data.forEach((genre) => {
			const g = document.createElement("button");
			g.innerHTML = `${genre.name}`;
			ulGenresList.appendChild(g);
		});
	} catch (err) {
		console.log("err", err);
	}
};

renderGenres();

const getFeaturedGames = async () => {
	try {
		const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features`;
		const response = await fetch(url);
		const data = response.json();
		return data;
	} catch (err) {
		console.log("err", err);
	}
};



const renderFeaturedGames = async () => {
	try {
		const response = await getFeaturedGames();
		const productContent = document.querySelector(".product-content");
		productContent.innerHTML = "";
		response.data.forEach((game) => {
			let gameValue;
			if (game.price === 0) {
				gameValue = `Free To Play`;
			} else {
				gameValue = `${game.price} $`;
			}
			const product = document.createElement("div");
			product.innerHTML = `<div class="product-wrapper">
      <div class="cover-image"><img src="${game.header_image}" /></div>
      <div class="game-info" id="${game.appid}">
        <h4>${game.name}</h4>
        <h5>${gameValue}</h5>
      </div>
    </div>`;
			productContent.appendChild(product);
		});
	} catch (err) {
		console.log("err", err);
	}
};

const search = document.querySelector("#search-input");
const searchIcon = document.querySelector(".search-icon");

let queryString = "";
if (search.value) {
	queryString += `q=${search.value}`;
} else {
	renderFeaturedGames();
}

const findGames = async () => {
	try {
		const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?${queryString}`;
		const response = await fetch(url);
		const data = response.json();
		return data;
	} catch (err) {
		console.log("err", err);
	}
};

findGames().then((data) => console.log(data));

const renderFoundGames = async () => {
	try {
		const response = await findGames();

		const productTopic = document.querySelector(".product-topic");
		productTopic.children[0].innerHTML = `Search results: ${search.value}`;

		const productContent = document.querySelector(".product-content");
		productContent.innerHTML = "";
		response.data.forEach((game) => {
			let gameValue;
			if (game.price === 0) {
				gameValue = `Free To Play`;
			} else {
				gameValue = `${game.price} $`;
			}
			const product = document.createElement("div");
			product.innerHTML = `<div class="product-wrapper">
      <div class="cover-image"><img src="${game.header_image}" /></div>
      <div class="game-info" id="${game.appid}">
        <h4>${game.name}</h4>
        <h5>${gameValue}</h5>
      </div>
    	</div>`;
			productContent.appendChild(product);
		});
	} catch (err) {
		console.log("err", err);
	}
};

search.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		renderFoundGames();
	}
});

searchIcon.addEventListener("click", () => {
	renderFoundGames();
});

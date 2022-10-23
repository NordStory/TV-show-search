// https://www.tvmaze.com/api
// https://api.tvmaze.com/search/shows?q=girls
const containerCards = document.querySelector('.cardsFilm');
const form = document.querySelector('#searchForm');
const form_input = document.querySelector('#searchForm__input');
const h2Info = document.querySelector('.info')

form.addEventListener('submit', async (e) => {
    try {
        removeCards();
        e.preventDefault();
        h2Info.textContent = '';

        const showSearch = form.elements.query.value;
        const config = { params: { q: showSearch } };
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

        if (res.data.length !== 0) {
            creatCard(res.data);
        } else {
            h2Info.textContent = `Nothing found. Try to find something else`
        }

        form_input.value = '';

    } catch (error) {
        console.warn("Don't work", error);
        h2Info.textContent = `Don't work :(`
    }
})

function creatCard(shows) {
    for (let result of shows) {
        if (result.show.image) {
            let genres = result.show.genres;
            if (genres.length !== 0) {
                genres = result.show.genres[0];
            } else { genres = 'Other' }
            const cardFilm = document.createElement('div');
            cardFilm.classList.add('cardFilm');
            cardFilm.innerHTML = `
                    <a class="cardFilm__officialSiteLink" href=${result.show.officialSite}>
                        <img class="cardFilm__img"
                            src="${result.show.image.medium}" alt="">
                    </a>
    
                    <div class="cardFilm__info">
                        <div class="cardFilm__info-container">
                            <div class="cardFilm__nameAndScore">
                                <div class="cardFilm__nameFilm">${result.show.name}</div>
                                <div class="cardFilm__score">${Math.floor(result.score * 10)}/10</div>
                            </div>
    
                            <div class="cardFilm__genres">
                                <p class="cardFilm__genre">${genres}</p>
                            </div>
                        </div>
                    </div>
        `;
            containerCards.append(cardFilm);
        }
    }
}

function removeCards() {
    const cards = document.querySelectorAll('.cardFilm');
    for (const card of cards) {
        card.remove();
    }
}

function creatCardTest() {
    const cardFilm = document.createElement('div');
    cardFilm.classList.add('cardFilm');
    cardFilm.innerHTML = `
                <a class="cardFilm__officialSiteLink" href="#">
                    <img class="cardFilm__img"
                        src="https://static.tvmaze.com/uploads/images/medium_portrait/13/34472.jpg" alt="">
                </a>

                <div class="cardFilm__info">
                    <div class="cardFilm__info-container">
                        <div class="cardFilm__nameAndScore">
                            <div class="cardFilm__nameFilm">Name film</div>
                            <div class="cardFilm__score">7.1/10</div>
                        </div>

                        <div class="cardFilm__genres">
                            <p class="cardFilm__genre">Drama</p>
                        </div>
                    </div>
                </div>
    `;
    containerCards.append(cardFilm)
}
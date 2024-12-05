// ? Font: Edu task beginner 

console.clear();

//! Api URL 
const baseUrl = "http://localhost:5500/";
//! Endpoint
const resource = {
    posts: "posts"
};
//! Params
const params = { _limit: 6 };
const params2 = { min: 1, max: 10 };

//!  costanti
const card = document.getElementById("card");
const closeButton = document.getElementById("close");
// const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");
const overlay = document.getElementById("overlay");
const imgOverlay = document.getElementById("imgOver");
let selPhoto;

//! Stampare le card
getData(resource.posts, params2);
function getData(resource, params) {
    // limite di 6
    axios.get(baseUrl + resource + params).then((res) => {    //! chiamata axios
        const posts = res.data;
        console.log(posts);
        const template = posts.map((post) => {
            const { id, titolo, contenuto, immagine, tags } = post   //! Destrutturazione
            return `
            <figure id="${id}" class="col d-flex flex-column">
              <img id="pin" src="../images/pin.svg" alt="Pallino">
              <div class="img">
                  <img src="${immagine}" alt="${titolo}">
              </div>
              <div class="text">
                <p>${titolo}</p>
                <p>${contenuto}</p>
            </div>
          </figure>
            `;
        }).join("");
        card.innerHTML += template;
        getFigures(photos);
    })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log("in tutti i casi eseguita");
        });

    //todo Soluzione con un ciclo for 

    // for (let i = 0; i < 6; i++) {
    //     const arrayName = [];
    //     let templat = "";
    //     axios.get(baseUrl + resource, { params }).then((res) => {
    //         console.log(res.data);
    //         const image = res.data[i].url;
    //         console.log(image);
    //         const text = res.data[i].title;
    //         console.log(text);
    //         template += `
    //         <div id="imagecard"  class="col d-flex flex-column">
    //             <img id="pin" src="./img/pin.svg" alt="Pallino">
    //             <div class="img">
    //                 <img src="${image}" alt="Foto">
    //             </div>
    //             <div class="text">
    //                 <p>${text}</p>
    //             </div>
    //             </div>
    //         `;
    //         arrayName.push(res.data);
    //         getFigures();
    //         if (arrayName.length === 6) {
    //             card.innerHTML = template;
    //         };
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    //         .finally(() => {
    //             console.log("in tutti i casi eseguita");
    //         });
    // };
}

//! Overlay foto 
function getFigures(p) {
    let figures = document.querySelectorAll("figure");
    console.log(figures);
    figures.forEach((figure) => {
        figure.addEventListener("click", function () {
            console.log(figure.id);
            overlay.classList.remove("d-none");
            selPhoto = p.find((el) => el.id === parseInt(figure.id));
            console.log(selPhoto);
            imgOverlay.src = selPhoto.immagine;
            imgOverlay.alt = selPhoto.titolo;
        });
    });
    closeButton.addEventListener("click", function () {
        overlay.classList.add("d-none");
    });
    deleteButton.addEventListener("click", function () {
        // console.log("Ciao");
        overlay.classList.add("d-none");
        console.log(selPhoto);
        figures.forEach((el) => {
            console.log(el);
            if (el.id == selPhoto.id) {
                el.remove();
            }
        });

        figures = document.querySelectorAll("figure");
        console.log(figures);
    });
}

//! Bottone aggiungi card

// addButton.addEventListener("click", function () {
//     getData(paramsOne);
// });



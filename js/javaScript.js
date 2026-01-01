
// Laddar navbaren

fetch("nav.html")
    .then(res => res.text())
    .then(html => {
        const navbar = document.getElementById("navbar");
        if (navbar) {
            navbar.innerHTML = html;
        }
    })
    .catch(err => console.error("Navbar error:", err));


// Produktlistan

const products = [

    // HOODIES
    {
        name: "Hoodie Dam",
        category: "hoodies",
        sub: "women",
        img: "../assets/images/HoodieDam.jpg"
    },
    {
        name: "Hoodie Kille",
        category: "hoodies",
        sub: "men",
        img: "../assets/images/Hoodie.jpg"
    },
    {
        name: "Hoodie Unisex",
        category: "hoodies",
        sub: "unisex",
        img: "../assets/images/HoodieUnisex.jpg"
    },

    // T-SHIRTS
    {
        name: "T-shirt Dam",
        category: "tshirts",
        sub: "women",
        img: "../assets/images/T-shirtDam.jpg"
    },
    {
        name: "T-shirt Kille",
        category: "tshirts",
        sub: "men",
        img: "../assets/images/T-shirt.jpg"
    },
    {
        name: "T-shirt Unisex",
        category: "tshirts",
        sub: "unisex",
        img: "../assets/images/T-shirtUnisex.jpg"
    },

    // SHOES  ✅ (ÄNDRAT FRÅN "skor")
    {
        name: "Skor Dam",
        category: "shoes",
        sub: "women",
        img: "../assets/images/SkorDam.jpg"
    },
    {
        name: "Skor Kille",
        category: "shoes",
        sub: "men",
        img: "../assets/images/Skor.jpg"
    },
    {
        name: "Skor Unisex",
        category: "shoes",
        sub: "unisex",
        img: "../assets/images/SkorUnisex.jpg"
    },

    // KEPS
{
    name: "Keps Dam",
    category: "hats",
    sub: "women",
    img: "../assets/images/KepsDam.jpg"
},
{
    name: "Keps Kille",
    category: "hats",
    sub: "men",
    img: "../assets/images/Keps.jpg"
},
{
    name: "Keps Unisex",
    category: "hats",
    sub: "unisex",
    img: "../assets/images/KepsUnisex.jpg"
}
];



// SUBCATEGORIES (Women / Men / Unisex)

if (window.location.pathname.includes("subcategories.html")) {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category")?.toLowerCase();

    const title = document.getElementById("subcategory-title");
    if (title && category) {
        title.innerText = "Välj underkategori för " + category.toUpperCase();
    }

    const womenLink = document.getElementById("women-link");
    const menLink = document.getElementById("men-link");
    const unisexLink = document.getElementById("unisex-link");

    if (womenLink) {
        womenLink.href = `products.html?category=${category}&sub=women`;
    }
    if (menLink) {
        menLink.href = `products.html?category=${category}&sub=men`;
    }
    if (unisexLink) {
        unisexLink.href = `products.html?category=${category}&sub=unisex`;
    }
}



//visa produkterna

if (window.location.pathname.includes("products.html")) {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category")?.toLowerCase();
    const sub = params.get("sub")?.toLowerCase();

    const title = document.getElementById("category-title");
    if (title && category && sub) {
        title.textContent = `${category.toUpperCase()} – ${sub.toUpperCase()}`;
    }

    const container = document.getElementById("product-container");

    if (container && category && sub) {

        container.innerHTML = "";

        const filtered = products.filter(p =>
            p.category === category && p.sub === sub
        );

        if (filtered.length === 0) {
            container.innerHTML = "<p>Inga produkter i denna kategori.</p>";
        }

        filtered.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <p>${p.name}</p>
            `;

            container.appendChild(card);
        });
    }
}
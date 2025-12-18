
// Laddar navbaren
fetch("nav.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
    });


//Produktlistan

const products = [
    { name: "Svart hoodie", category: "hoodies", img: "../assets/images/Hoodie.jpg" },
    { name: "Vit hoodie", category: "hoodies", img: "../assets/images/Hoodie.jpg" },
    { name: "Keps", category: "kepsar", img: "../assets/images/Keps.jpg" },
    { name: "T-shirt", category: "tshirts", img: "../assets/images/T-shirt.jpg" },
    { name: "Skor", category: "skor", img: "../assets/images/Skor.jpg" }
];


//Visar produkterna baserat på URL

if (window.location.pathname.includes("products.html")) {

    // hämta kategori ur URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    document.getElementById("category-title").textContent = category.toUpperCase();

    const container = document.getElementById("product-container");
    const filtered = products.filter(p => p.category === category);

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
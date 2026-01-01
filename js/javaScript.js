
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


// 2. Hämta sparade produkter från admin-sidan
const storedProducts = JSON.parse(localStorage.getItem("myCustomProducts")) || [];

// 3. Slå ihop listorna
const allProducts = [...products, ...storedProducts];

// 4. Visa produkterna (använd allProducts istället för filtered på din gamla lista)
if (window.location.pathname.includes("products.html")) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    document.getElementById("category-title").textContent = category ? category.toUpperCase() : "Produkter";

    const container = document.getElementById("product-container");
    
    // Filtrera från den sammanslagna listan
    const filtered = allProducts.filter(p => p.category === category);

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

// 1. Dina standardkategorier
const defaultCategories = ["Hoodies", "T-shirts", "Skor", "Kepsar"];

// 2. Hämta sparade kategorier från localStorage
const customCategories = JSON.parse(localStorage.getItem("myCustomCategories")) || [];

// 3. Slå ihop dem
const allCategories = [...defaultCategories, ...customCategories];

// 4. Om vi är på kategorisidan, rita ut dem
if (window.location.pathname.includes("categories.html")) {
    const categoryList = document.querySelector(".category-list");
    
    // Rensa de hårdkodade länkarna om du vill, eller bara lägg till de nya
    categoryList.innerHTML = ""; 

    allCategories.forEach(cat => {
        const link = document.createElement("a");
        link.classList.add("category-card");
        
        // Skapa URL-vänligt namn (t.ex. "T-shirt" blir "tshirts" eller "t-shirt")
        const urlFriendly = cat.toLowerCase().replace(/\s+/g, '');
        
        link.href = `products.html?category=${urlFriendly}`;
        link.textContent = cat;
        
        categoryList.appendChild(link);
    });
}
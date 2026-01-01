const categories = ["T-shirt", "Hoodie", "Shoes", "Caps"];
let currentImageSrc = "";

const categoryForm = document.getElementById("categoryForm");
const categoryInput = document.getElementById("categoryInput");
const categorySelect = document.getElementById("categorySelect");

const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const descriptionInput = document.getElementById("description");
const productImageInput = document.getElementById("productImage");
const productPreview = document.querySelector(".productPreview");
const categorySelectInput = document.getElementById("categorySelect");

const saveBtn = document.getElementById("saveProductBtn");

// Uppdatera din befintliga eventListener för categoryForm
categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newCategory = categoryInput.value.trim();
    if (newCategory === "") return;

    // 1. Lägg till i den lokala arrayen (för dropdownen)
    categories.push(newCategory);
    updateCategoryDropdown();

    // 2. Hämta sparade kategorier från localStorage eller skapa tom lista
    const storedCategories = JSON.parse(localStorage.getItem("myCustomCategories")) || [];
    
    // 3. Spara den nya kategorin om den inte redan finns
    if (!storedCategories.includes(newCategory)) {
        storedCategories.push(newCategory);
        localStorage.setItem("myCustomCategories", JSON.stringify(storedCategories));
    }

    categoryInput.value = "";
    alert("Kategori sparad!");
});

function updateCategoryDropdown() {
    categorySelect.innerHTML = '<option value="">Välj kategori</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}
updateCategoryDropdown();

function updatePreview() {
    const name = productNameInput.value;
    const category = categorySelectInput.value;
    const description = descriptionInput.value;
    const file = productImageInput.files[0];

    let previewHTML = `<h2>Preview of product:</h2>`;

    if(file){
        const reader = new FileReader();
        reader.onload = function(e) {
            currentImageSrc = e.target.result; // SPARAR BILDEN HÄR
            renderPreview(previewHTML, name, category, description, currentImageSrc);
        };
        reader.readAsDataURL(file);
    } else {
        renderPreview(previewHTML, name, category, description, "");
    }
}

// Hjälpfunktion för att rita ut preview (minskar kodupprepning)
function renderPreview(html, name, cat, desc, img) {
    if(img) html += `<img src="${img}" alt="Product image" style="max-width:200px;"><br>`;
    html += `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Category:</strong> ${cat}</p>
        <p><strong>Description:</strong> ${desc}</p>
    `;
    productPreview.innerHTML = html;
}

// Uppdatera din saveBtn-lyssnare med logik för plural (S-et i slutet)
saveBtn.addEventListener("click", function(e) {
    e.preventDefault();

    if (!productNameInput.value || !categorySelectInput.value) {
        alert("Fyll i namn och kategori!");
        return;
    }

    // Fix för att matcha "hoodies", "tshirts" etc.
    let catValue = categorySelectInput.value.toLowerCase();
    if (catValue === "t-shirt") catValue = "tshirts";
    if (catValue === "hoodie") catValue = "hoodies";
    if (catValue === "shoes") catValue = "skor";
    if (catValue === "caps") catValue = "kepsar";

    const newProduct = {
        name: productNameInput.value,
        category: catValue, 
        description: descriptionInput.value,
        img: currentImageSrc || "../assets/images/default.jpg" 
    };

    const storedProducts = JSON.parse(localStorage.getItem("myCustomProducts")) || [];
    storedProducts.push(newProduct);
    localStorage.setItem("myCustomProducts", JSON.stringify(storedProducts));

    alert("Produkten sparad!");
    window.location.href = "products.html?category=" + catValue;
});

// Live-preview när man skriver eller ändrar val
productNameInput.addEventListener("input", updatePreview);
descriptionInput.addEventListener("input", updatePreview);
categorySelectInput.addEventListener("change", updatePreview);
productImageInput.addEventListener("change", updatePreview);

// Behåll "Update preview"-knappen som backup
productForm.addEventListener("submit", function(e) {
    e.preventDefault();
    updatePreview();
});
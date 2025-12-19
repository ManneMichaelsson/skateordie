const categories = ["T-shirt", "Hoodie", "Shoes", "Caps"];

const categoryForm = document.getElementById("categoryForm");
const categoryInput = document.getElementById("categoryInput");
const categorySelect = document.getElementById("categorySelect");

const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const descriptionInput = document.getElementById("description");
const productImageInput = document.getElementById("productImage");
const productPreview = document.querySelector(".productPreview");
const categorySelectInput = document.getElementById("categorySelect");

categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newCategory = categoryInput.value.trim();

    if (newCategory === "") return;

    categories.push(newCategory);
    updateCategoryDropdown();

    categoryInput.value = "";
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

    // Om användaren valt en bild, visa den först
    if(file){
        const reader = new FileReader();
        reader.onload = function(e) {
            previewHTML += `<img src="${e.target.result}" alt="Product image" style="max-width:200px;"><br>`;
            previewHTML += `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Description:</strong> ${description}</p>
            `;
            productPreview.innerHTML = previewHTML;
        };
        reader.readAsDataURL(file);
    } else {
        // Ingen bild vald → visa bara text
        previewHTML += `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
        productPreview.innerHTML = previewHTML;
    }
}

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
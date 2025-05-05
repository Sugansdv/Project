

function filterProducts() {
  const selectedFilters = {
    price: getSelectedCheckboxValues('price'),
    discount: getSelectedCheckboxValues('discount'),
    color: getSelectedCheckboxValues('color'),
    productType: getSelectedCheckboxValues('productType'),
    age: getSelectedCheckboxValues('age'),
    brand: getSelectedCheckboxValues('brand'),
    fabric: getSelectedCheckboxValues('fabric'),
    sleeves: getSelectedCheckboxValues('sleeves') 
  };
  console.log("Selected Fabric Filters:", selectedFilters.fabric);

  const filteredProducts = products.filter(product => {
   
    if (selectedFilters.price.length > 0) {
      const priceMatch = selectedFilters.price.some(range => {
        if (range === '₹ 0–500') return product.price >= 0 && product.price <= 500;
        if (range === '₹ 501–1000') return product.price >= 501 && product.price <= 1000;
        if (range === '₹ 1001–2000') return product.price >= 1001 && product.price <= 2000;
        if (range === '₹ 2000 AND ABOVE') return product.price >= 2000;
        return false;
      });
      if (!priceMatch) return false;
    }

    if (selectedFilters.discount.length > 0) {
      const discountMatch = selectedFilters.discount.some(discount => {
        const minDiscount = parseInt(discount);
        return product.discount >= minDiscount;
      });
      if (!discountMatch) return false;
    }

    if (selectedFilters.color.length > 0 && !selectedFilters.color.includes(product.color)) {
      return false;
    }

    if (selectedFilters.productType.length > 0 && !selectedFilters.productType.includes(product.type)) {
      return false;
    }

    if (selectedFilters.age.length > 0 && !selectedFilters.age.includes(product.age)) {
      return false;
    }

    if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
      return false;
    }

    if (selectedFilters.fabric.length > 0 &&
      !selectedFilters.fabric.some(f => f.toLowerCase() === product.fabric.toLowerCase())) {
    return false;
  }
  

    if (selectedFilters.sleeves.length > 0 && !selectedFilters.sleeves.includes(product.sleeves)) {
      return false;
    }

    return true;
  });

  displayProducts(filteredProducts);
}

function getSelectedCheckboxValues(prefix) {
  const checkboxes = document.querySelectorAll(`input[type="checkbox"][id^="${prefix}"]:checked`);
  return Array.from(checkboxes).map(checkbox => {
    const label = document.querySelector(`label[for="${checkbox.id}"]`);
    return label ? label.textContent.trim() : '';
  });
}

function displayProducts(productsToDisplay) {
  const productsContainer = document.querySelector('.products-col .row');
  productsContainer.innerHTML = '';

  if (productsToDisplay.length === 0) {
    productsContainer.innerHTML = '<p class="text-center">No products match your filters.</p>';
    return;
  }

  productsToDisplay.forEach(product => {
    const productCol = document.createElement('div');
    productCol.className = 'col-md-4 col-sm-6';
    productCol.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
      </div>
    `;
    productsContainer.appendChild(productCol);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });

  displayProducts(products);
});
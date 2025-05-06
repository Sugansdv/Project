
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems; 
  }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

const addToCartButtons = document.querySelectorAll('.btn-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.custom-card');
    const title = card.querySelector('.card-title').innerText;
    const price = card.querySelector('.price').innerText.replace('₹', '').trim();
    const image = card.querySelector('.product-img').getAttribute('src');
    const productId = image; 

    const fullImagePath = 'assets/image/home_screen/' + image.split('/').pop();
    const relativeImagePathForCart = '../' + fullImagePath;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.image === relativeImagePathForCart);

    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      cart.push({
        id: productId,   
        title,
        price,
        image: relativeImagePathForCart,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    button.textContent = 'Added!';
    setTimeout(() => {
      button.textContent = 'Add to Cart';
    }, 1000);
  });
});
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
  }

  document.addEventListener('DOMContentLoaded', updateCartCount);

  const addToCartButtons = document.querySelectorAll('.btn-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.custom-card');
      const title = card.querySelector('.card-title').innerText;
      const price = card.querySelector('.price').innerText.replace('₹', '').trim();
      const image = card.querySelector('.product-img').getAttribute('src');
  
      const fullImagePath = 'assets/image/home_screen/' + image.split('/').pop(); // e.g., image6.png
      const relativeImagePathForCart = '../' + fullImagePath;
  
      const product = {
        title,
        price,
        image: relativeImagePathForCart,
        quantity: 1
      };
  
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      updateCartCount();
      
      // alert(`${title} added to cart!`);
    });
  });
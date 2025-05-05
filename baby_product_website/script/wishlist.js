document.addEventListener('DOMContentLoaded', function() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    function updateWishlistCount() {
      const countElement = document.getElementById('wishlist-count');
      if (countElement) {
        countElement.textContent = wishlist.length;
      }
    }
    
    updateWishlistCount();
    
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const card = this.closest('.custom-card');
        const product = {
          name: card.querySelector('.card-title').textContent,
          price: card.querySelector('.price').textContent,
          image: card.querySelector('img').src,
          id: card.querySelector('img').src 
        };
        
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex === -1) {
          wishlist.push(product);
          this.textContent = 'Added to Wishlist';
          setTimeout(() => {
            this.textContent = 'Add to Wishlist';
          }, 2000);
        } else {
          wishlist.splice(existingIndex, 1);
          this.textContent = 'Removed from Wishlist';
          setTimeout(() => {
            this.textContent = 'Add to Wishlist';
          }, 2000);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
      });
    });
  });
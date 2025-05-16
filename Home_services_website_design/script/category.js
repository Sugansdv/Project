document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-cat-card');
  const viewAllBtn = document.getElementById('viewAllBtn');

  let visibleCount = 3;
  showCards(visibleCount);

  function showCards(count) {
    cards.forEach((card, index) => {
      card.style.display = index < count ? 'block' : 'none';
    });

    if (count >= cards.length) {
      viewAllBtn.style.display = 'none';
    } else {
      viewAllBtn.style.display = 'block';
    }
  }

  viewAllBtn.addEventListener('click', () => {
    visibleCount += 3;
    showCards(visibleCount);
  });

  document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedCategory = this.getAttribute('data-category');

      if (selectedCategory === 'all') {
        visibleCount = 6; 
        showCards(visibleCount);
      } else {
        cards.forEach(card => {
          if (card.getAttribute('data-category') === selectedCategory) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        viewAllBtn.style.display = 'none';
      }
    });
  });
});

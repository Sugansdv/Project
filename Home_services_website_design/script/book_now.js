window.addEventListener('DOMContentLoaded', function () {
  const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
  const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  const confirmationMessage = document.getElementById('confirmationMessage');

  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.book-service-card');
      let service = 'Service';
      if (card.classList.contains('electrician')) service = 'Electrician';
      else if (card.classList.contains('plumber')) service = 'Plumber';
      else if (card.classList.contains('painter')) service = 'Painter';

      document.getElementById('serviceType').value = service;
      document.getElementById('bookingModalLabel').textContent = `Book a ${service}`;
      bookingModal.show();
    });
  });

  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const service = document.getElementById('serviceType').value;
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const datetime = document.getElementById('datetime').value.trim();

    const [date, time] = datetime.split('T');

    const newBooking = { service, name, phone, address, date, time };
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const duplicate = bookings.some(b => b.date === date && b.time === time);

    bookingModal.hide();

    if (duplicate) {
      confirmationMessage.textContent = "⛔ Time already booked! Please change time.";
    } else {
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      confirmationMessage.textContent = "✅ Booking confirmed! We will contact you soon.";
      this.reset();
    }

    confirmationModal.show();
  });
});

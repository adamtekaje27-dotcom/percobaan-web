// Data List Mobil (Mock Database)
const carData = [
    {
        id: 1,
        brand: "Toyota",
        name: "Toyota Raize 1.0 Turbo",
        type: "SUV",
        year: 2022,
        transmission: "Otomatis (CVT)",
        price: 235000000,
        priceValue: 235, // dalam juta untuk filter
        placeholderText: "🚗 Gambar Toyota Raize"
    },
    {
        id: 2,
        brand: "Honda",
        name: "Honda City Hatchback RS",
        type: "Sedan",
        year: 2021,
        transmission: "Otomatis",
        price: 268000000,
        priceValue: 268,
        placeholderText: "🚗 Gambar Honda City"
    },
    {
        id: 3,
        brand: "Hyundai",
        name: "Hyundai Creta Prime",
        type: "SUV",
        year: 2023,
        transmission: "Otomatis",
        price: 365000000,
        priceValue: 365,
        placeholderText: "🚗 Gambar Hyundai Creta"
    },
    {
        id: 4,
        brand: "BMW",
        name: "BMW 320i Sport",
        type: "Sedan",
        year: 2019,
        transmission: "Otomatis",
        price: 645000000,
        priceValue: 645,
        placeholderText: "🚗 Gambar BMW 320i"
    },
    {
        id: 5,
        brand: "Toyota",
        name: "Toyota Avanza 1.5 G",
        type: "MPV",
        year: 2022,
        transmission: "Manual",
        price: 195000000,
        priceValue: 195,
        placeholderText: "🚗 Gambar Toyota Avanza"
    },
    {
        id: 6,
        brand: "Honda",
        name: "Honda HR-V SE",
        type: "SUV",
        year: 2022,
        transmission: "Otomatis",
        price: 385000000,
        priceValue: 385,
        placeholderText: "🚗 Gambar Honda HR-V"
    }
];

// Format mata uang Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Render Card Mobil ke HTML
function renderCars(cars) {
    const carGrid = document.getElementById('car-grid');
    carGrid.innerHTML = '';

    if (cars.length === 0) {
        carGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
            <h3>Mobil Tidak Ditemukan</h3>
            <p>Silakan coba ubah filter pencarian Anda.</p>
        </div>`;
        return;
    }

    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div class="car-img">${car.placeholderText}</div>
            <div class="car-info">
                <div class="car-tags">
                    <span class="tag tag-blue">${car.type}</span>
                    <span class="tag tag-green">Bekas Terverifikasi</span>
                </div>
                <h3 class="car-name">${car.name}</h3>
                <div class="car-specs">
                    <span>📅 ${car.year}</span>
                    <span>⚙️ ${car.transmission}</span>
                </div>
                <div class="car-price-row">
                    <span class="car-price">${formatRupiah(car.price)}</span>
                    <button class="btn btn-outline btn-sm" onclick="showDetail(${car.id})">Detail</button>
                </div>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Fungsi Filter Pencarian
function filterCars() {
    const brandValue = document.getElementById('filter-brand').value;
    const typeValue = document.getElementById('filter-type').value;
    const priceValue = document.getElementById('filter-price').value;

    const filtered = carData.filter(car => {
        const matchBrand = (brandValue === 'all' || car.brand === brandValue);
        const matchType = (typeValue === 'all' || car.type === typeValue);
        
        let matchPrice = true;
        if (priceValue !== 'all') {
            matchPrice = car.priceValue <= parseInt(priceValue);
        }

        return matchBrand && matchType && matchPrice;
    });

    renderCars(filtered);
}

// Fungsi Modal Detail
function showDetail(carId) {
    const car = carData.find(c => c.id === carId);
    const modal = document.getElementById('car-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h2 style="margin-bottom: 15px;">${car.name}</h2>
        <div style="background: #cbd5e1; height: 220px; display:flex; align-items:center; justify-content:center; border-radius:8px; margin-bottom: 20px; font-size: 20px;">
            ${car.placeholderText}
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #e2e8f0; padding: 8px 0;"><td style="padding: 8px 0; font-weight:600;">Merek</td><td>: ${car.brand}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight:600;">Tipe/Kategori</td><td>: ${car.type}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight:600;">Tahun Rilis</td><td>: ${car.year}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight:600;">Transmisi</td><td>: ${car.transmission}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; font-weight:600;">Status</td><td>: Hubungi Penjual (Ready)</td></tr>
        </table>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 22px; font-weight: 700; color: #0052cc;">${formatRupiah(car.price)}</span>
            <a href="https://wa.me/628123456789" target="_blank" class="btn btn-primary" style="text-decoration:none; display:inline-block; text-align:center;">Hubungi via WhatsApp</a>
        </div>
    `;

    modal.style.display = 'flex';
}

// Event Listeners untuk Penutupan Modal
document.addEventListener('DOMContentLoaded', () => {
    // Render awal data mobil
    renderCars(carData);

    // Filter klik tombol
    document.getElementById('btn-search').addEventListener('click', filterCars);

    const modal = document.getElementById('car-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

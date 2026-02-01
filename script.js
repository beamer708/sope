/**
 * Sopes Auto Detailing — Production
 * Vehicle size modal, dynamic pricing, expandable services.
 */

const STORAGE_KEY = 'sopes_vehicle_size';
const CONFIRMED_KEY = 'sopes_vehicle_modal_done';
const DEFAULT_SIZE = 'sedan';

document.addEventListener('DOMContentLoaded', () => {
  injectVehicleModal();
  initNavToggle();
  initVehicleModal();
  initVehicleSizeSelector();
  initPricingDisplay();
  updatePriceVisibility();
  updateHeaderVehicleLabel();
  maybeShowModalFirstVisit();
  initServiceAccordion();
});

function getVehicleSize() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && window.SOPES_PRICING) {
      const found = window.SOPES_PRICING.vehicleSizes.find(s => s.id === stored);
      if (found) return stored;
    }
  } catch (_) {}
  return DEFAULT_SIZE;
}

function getVehicleConfirmed() {
  try {
    return sessionStorage.getItem(CONFIRMED_KEY) === 'true';
  } catch (_) {}
  return false;
}

function setVehicleSize(id) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
    sessionStorage.setItem(CONFIRMED_KEY, 'true');
  } catch (_) {}
  document.body.classList.add('vehicle-selected');
  updateAllPricing();
  updateVehicleSelectorUI();
  updateHeaderVehicleLabel();
  updateModalSelectionUI();
}

function getMultiplier() {
  if (!window.SOPES_PRICING) return 1;
  const size = window.SOPES_PRICING.vehicleSizes.find(s => s.id === getVehicleSize());
  return size ? size.multiplier : 1;
}

function getPrice(serviceKey) {
  if (!window.SOPES_PRICING) return null;
  const services = window.SOPES_PRICING.services || {};
  const maintenance = window.SOPES_PRICING.maintenance || {};
  const basePrice = services[serviceKey] !== undefined ? services[serviceKey] : maintenance[serviceKey];
  if (basePrice == null) return null;
  return Math.round(basePrice * getMultiplier());
}

function formatPrice(amount) {
  if (amount == null) return '—';
  return '$' + String(amount);
}

function updateAllPricing() {
  if (!window.SOPES_PRICING) return;
  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.getAttribute('data-price');
    const price = getPrice(key);
    const formatted = formatPrice(price);
    el.classList.remove('price-placeholder-text');
    if (el.hasAttribute('data-price-prefix')) {
      el.textContent = (el.getAttribute('data-price-prefix') || 'Starting at ') + formatted;
    } else {
      el.textContent = formatted;
    }
  });
}

function updatePriceVisibility() {
  const confirmed = getVehicleConfirmed();
  if (confirmed) {
    document.body.classList.add('vehicle-selected');
    updateAllPricing();
  } else {
    document.body.classList.remove('vehicle-selected');
    document.querySelectorAll('[data-price]').forEach(el => {
      el.textContent = 'Select vehicle to see pricing';
      el.classList.add('price-placeholder-text');
    });
  }
}

function updateVehicleSelectorUI() {
  const current = getVehicleSize();
  document.querySelectorAll('.vehicle-size-btn').forEach(btn => {
    const id = btn.getAttribute('data-vehicle-size');
    if (id === current) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  const label = document.querySelector('.vehicle-size-current');
  if (label && window.SOPES_PRICING) {
    const size = window.SOPES_PRICING.vehicleSizes.find(s => s.id === current);
    label.textContent = size ? size.label : 'Sedan';
  }
}

function updateHeaderVehicleLabel() {
  const label = document.getElementById('header-vehicle-label');
  if (label && window.SOPES_PRICING) {
    const size = window.SOPES_PRICING.vehicleSizes.find(s => s.id === getVehicleSize());
    label.textContent = size ? size.label : 'Sedan';
  }
}

function injectVehicleModal() {
  if (document.getElementById('vehicle-size-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'vehicle-size-modal';
  modal.className = 'vehicle-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'vehicle-modal-title');
  modal.setAttribute('hidden', '');
  modal.innerHTML =
    '<div class="vehicle-modal-overlay" aria-hidden="true"></div>' +
    '<div class="vehicle-modal-content">' +
      '<button type="button" class="vehicle-modal-close" aria-label="Close">&times;</button>' +
      '<h2 id="vehicle-modal-title">Select your vehicle size</h2>' +
      '<p class="vehicle-modal-desc">Pricing is based on vehicle size. Choose yours to see accurate prices across the site.</p>' +
      '<div class="vehicle-modal-options">' +
        '<button type="button" class="vehicle-modal-btn" data-vehicle-size="sedan">Sedan</button>' +
        '<button type="button" class="vehicle-modal-btn" data-vehicle-size="coupe">Coupe</button>' +
        '<button type="button" class="vehicle-modal-btn" data-vehicle-size="suv">SUV</button>' +
        '<button type="button" class="vehicle-modal-btn" data-vehicle-size="truck">Truck</button>' +
        '<button type="button" class="vehicle-modal-btn" data-vehicle-size="large">Large SUV / Van</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
}

function openVehicleModal() {
  const modal = document.getElementById('vehicle-size-modal');
  if (!modal) return;
  modal.removeAttribute('hidden');
  updateModalSelectionUI();
  document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicle-size-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function updateModalSelectionUI() {
  const current = getVehicleSize();
  document.querySelectorAll('.vehicle-modal-btn').forEach(btn => {
    const id = btn.getAttribute('data-vehicle-size');
    btn.classList.toggle('active', id === current);
  });
}

function initVehicleModal() {
  const modal = document.getElementById('vehicle-size-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.vehicle-modal-overlay');
  const closeBtn = modal.querySelector('.vehicle-modal-close');
  modal.querySelectorAll('.vehicle-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-vehicle-size');
      if (id) {
        setVehicleSize(id);
        closeVehicleModal();
      }
    });
  });

  if (overlay) overlay.addEventListener('click', closeVehicleModal);
  if (closeBtn) closeBtn.addEventListener('click', closeVehicleModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) closeVehicleModal();
  });
}

function maybeShowModalFirstVisit() {
  if (getVehicleConfirmed()) return;
  openVehicleModal();
}

function initVehicleSizeSelector() {
  const wrap = document.querySelector('.vehicle-size-selector');
  if (!wrap) return;
  wrap.querySelectorAll('.vehicle-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-vehicle-size');
      if (id) setVehicleSize(id);
    });
  });
  updateVehicleSelectorUI();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('#header-vehicle-btn') || e.target.closest('[data-open-vehicle-modal]')) {
    e.preventDefault();
    openVehicleModal();
  }
});

function initPricingDisplay() {
  if (getVehicleConfirmed()) updateAllPricing();
}

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
  }
}

function initServiceAccordion() {
  document.querySelectorAll('.service-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.service-accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.service-accordion-item').forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
}

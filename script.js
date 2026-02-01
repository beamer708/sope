/**
 * Sopes Auto Detailing — Production
 * Vehicle size selection and dynamic pricing across the site.
 */

const STORAGE_KEY = 'sopes_vehicle_size';
const DEFAULT_SIZE = 'sedan';

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initVehicleSizeSelector();
  initPricingDisplay();
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

function setVehicleSize(id) {
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch (_) {}
  updateAllPricing();
  updateVehicleSelectorUI();
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
    if (el.hasAttribute('data-price-prefix')) {
      el.textContent = (el.getAttribute('data-price-prefix') || 'Starting at ') + formatted;
    } else {
      el.textContent = formatted;
    }
  });
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

function initPricingDisplay() {
  updateAllPricing();
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

/**
 * Sopes Auto Detailing — Pricing by vehicle size
 *
 * Vehicle order: smallest to largest (cheapest → most expensive).
 * Packages use exact prices per vehicle tier; add-ons use base × multiplier.
 */

window.SOPES_PRICING = {
  vehicleSizes: [
    { id: 'coupe', label: 'Coupe', multiplier: 0.95 },
    { id: 'sedan', label: 'Sedan', multiplier: 1 },
    { id: 'suv', label: 'SUV', multiplier: 1.2 },
    { id: 'truck', label: 'Truck', multiplier: 1.35 },
    { id: 'large', label: 'Large SUV / Van', multiplier: 1.5 }
  ],

  /* Main packages — exact price per vehicle size (Coupes/Sedans, Midsize SUV, Large SUV/Truck) */
  packages: {
    fullDetail: {
      coupe: 269.99,
      sedan: 269.99,
      suv: 299.79,
      truck: 319.99,
      large: 319.99
    },
    exteriorOnly: {
      coupe: 79.99,
      sedan: 79.99,
      suv: 98.89,
      truck: 114.89,
      large: 114.89
    },
    interiorOnly: {
      coupe: 189.99,
      sedan: 189.99,
      suv: 219.79,
      truck: 269.89,
      large: 269.89
    }
  },

  /* Add-ons — base price (sedan), then × vehicle multiplier */
  services: {
    engineBay: 75,
    leatherConditioner: 50,
    headlightRestoration: 65,
    paintDecontaminationClayBar: 100
  },

  maintenance: {
    biweekly: 120,
    monthly: 140,
    bimonthly: 160
  }
};

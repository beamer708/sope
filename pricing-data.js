/**
 * Sopes Auto Detailing — Pricing by vehicle size
 *
 * Vehicle order: 1. Coupe, 2. Sedan, 3. Midsize SUV, 4. Large SUV / Truck (cheapest → most expensive).
 * Pricing is hidden until vehicle size is selected.
 */

window.SOPES_PRICING = {
  vehicleSizes: [
    { id: 'coupe', label: 'Coupe', multiplier: 1 },
    { id: 'sedan', label: 'Sedan', multiplier: 1 },
    { id: 'suv', label: 'Midsize SUV', multiplier: 1 },
    { id: 'truck', label: 'Large SUV / Truck', multiplier: 1 }
  ],

  /* Main packages — exact price per vehicle size */
  packages: {
    fullDetail: {
      coupe: 269.99,
      sedan: 269.99,
      suv: 299.79,
      truck: 319.99
    },
    exteriorOnly: {
      coupe: 79.99,
      sedan: 79.99,
      suv: 98.89,
      truck: 114.89
    },
    interiorOnly: {
      coupe: 189.99,
      sedan: 189.99,
      suv: 219.79,
      truck: 269.89
    }
  },

  /* Optional add-on: Paint Decontamination (Iron + Clay) — checkout / add-ons only; range by size */
  priceRanges: {
    paintDecontamination: {
      coupe: '40–60',
      sedan: '40–60',
      suv: '60–80',
      truck: '60–80'
    }
  },

  /* Maintenance packages — available AFTER a Full Detail; exact price per vehicle size */
  maintenance: {
    weekly: {
      coupe: 149.99,
      sedan: 149.99,
      suv: 159.99,
      truck: 169.99
    },
    biweekly: {
      coupe: 169.99,
      sedan: 169.99,
      suv: 179.99,
      truck: 189.99
    },
    monthly: {
      coupe: 189.99,
      sedan: 189.99,
      suv: 199.99,
      truck: 209.99
    }
  }
};

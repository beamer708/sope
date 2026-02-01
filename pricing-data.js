/**
 * Sopes Auto Detailing — Pricing by vehicle size
 *
 * Base prices below are placeholders for the dynamic pricing UI.
 * Replace with real prices from Sopes Auto Detailing once confirmed.
 */

window.SOPES_PRICING = {
  vehicleSizes: [
    { id: 'sedan', label: 'Sedan', multiplier: 1 },
    { id: 'coupe', label: 'Coupe', multiplier: 0.95 },
    { id: 'suv', label: 'SUV', multiplier: 1.2 },
    { id: 'truck', label: 'Truck', multiplier: 1.35 },
    { id: 'large', label: 'Large SUV / Van', multiplier: 1.5 }
  ],

  /* Base prices (sedan). REPLACE WITH REAL PRICES once confirmed. */
  services: {
    exterior: 150,
    interior: 150,
    engineBay: 75,
    leatherConditioner: 50,
    headlightRestoration: 65,
    paintDecontaminationClayBar: 100
  },

  /* Maintenance packages. Placeholders; confirm with business. */
  maintenance: {
    biweekly: 120,
    monthly: 140,
    bimonthly: 160
  }
};

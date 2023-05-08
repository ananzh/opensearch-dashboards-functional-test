/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const { BasicDocumentGenerator } = require('./basic_generator');

class TimeSeriesDocumentGenerator extends BasicDocumentGenerator {
  constructor(startTime, endTime, docCount) {
    super(startTime, endTime, docCount);
  }

  createDoc(index) {
    const doc = super.createDoc(index);

    // Generate the "orders" field based on the timestamp.
    const timestamp = new Date(doc.timestamp);
    const month = timestamp.getUTCMonth() + 1; // Get the month (1-12)
    const seasonalFactor = Math.sin(((month - 1) / 6) * Math.PI); // Seasonal effect (sinusoidal)
    const baseOrders = 100;
    const ordersWithoutRandomness = Math.round(
      baseOrders + baseOrders * 0.5 * seasonalFactor
    );

    // Add a random factor to the orders count
    const randomFactor = 0.1; // Adjust this value to control the degree of randomness
    const min = ordersWithoutRandomness * (1 - randomFactor);
    const max = ordersWithoutRandomness * (1 + randomFactor);
    const orders = Math.floor(Math.random() * (max - min + 1) + min);

    return {
      ...doc,
      orders,
      '@timestamp': doc.timestamp,
    };
  }
}

module.exports = { TimeSeriesDocumentGenerator };

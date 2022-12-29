'use strict';

/**
 * arac service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::arac.arac');

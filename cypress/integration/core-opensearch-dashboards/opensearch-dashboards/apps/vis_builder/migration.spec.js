/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BASE_PATH,
  toTestId,
  VB_APP_PATH,
  VB_APP_URL,
  VB_INDEX_DOC_COUNT,
  VB_INDEX_END_TIME,
  VB_INDEX_ID,
  VB_INDEX_PATTERN,
  VB_INDEX_START_TIME,
  VB_METRIC_VIS_TITLE,
  VB_PATH_INDEX_DATA,
  VB_PATH_SO_DATA,
  VISUALIZATION_PATH_SO_DATA,
  VB_SO_TYPE,
} from '../../../../../utils/constants';
import { CURRENT_TENANT } from '../../../../../utils/commands';

if (Cypress.env('VISBUILDER_ENABLED')) {
  describe('Vis Builder: Metric Chart', () => {
    before(() => {
      CURRENT_TENANT.newTenant = 'global';
      cy.fleshTenantSettings();
      cy.deleteIndex(VB_INDEX_ID);
      cy.bulkUploadDocs(VB_PATH_INDEX_DATA);
      cy.importSavedObjects(VB_PATH_SO_DATA);
      cy.importSavedObjects(VISUALIZATION_PATH_SO_DATA);
    });

    beforeEach(() => {
      CURRENT_TENANT.newTenant = 'global';
      cy.fleshTenantSettings();
    });

    it('Show existing visualizations in Visualize and navigate to it', () => {
      cy.visit(`${BASE_PATH}/app/visualize`);
      cy.get('input[type="search"]').type(`${VB_METRIC_VIS_TITLE}{enter}`);
      cy.get('.euiBasicTable-loading').should('not.exist'); // wait for the loading to stop
      cy.getElementByTestId(
        `visListingTitleLink-${toTestId(VB_METRIC_VIS_TITLE)}`
      )
        .should('exist')
        .click();
      cy.location('pathname').should('contain', VB_APP_PATH);
    });
  });
}

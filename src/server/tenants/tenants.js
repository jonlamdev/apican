/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan
 * -------------------------------------
 *  tenants.js : Defines tenant class
 *  used in various parts of this application
 *
 ******************************************************************************/
"use strict"
/******************************************************************************/

const TenantProto = require('@tenants/tenantProto').ServiceProvider

class Tenant extends TenantProto {

    constructor( tenantJSONInfo ) {

        super({
            accessToken: tenantJSONInfo.access_token,
            id: tenantJSONInfo.id,
            name: tenantJSONInfo.name,
            adminDomain: tenantJSONInfo.admin_domain
        })

        this.maintainerTag = lang => {
            return {
                email: "ic.api_store-magasin_des_apis.ic@canada.ca",
                url: "https://api.canada.ca",
                fn: utils.langMsg(lang, {
                    fr: "Equipe du magasin API",
                    en: "GC API Store Team"
                })
            }
        }

        this.description = lang => lang === 'en' ? tenantJSONInfo.description_en : tenantJSONInfo.description_fr
        this.domain = tenantJSONInfo.domain
        this.accounts = new Map() 
        this.visibleServices = []

    }
}

require('@server/tenants/tenantDocs').activeDocsInterface(Tenant)
require('@server/tenants/updateServices').addServiceUpdateFeature(Tenant)


module.exports = {
    Tenant    
}
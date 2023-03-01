import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
let ApiUrlsService = class ApiUrlsService {
    constructor() {
        this.mainUrl = environment.url;
        // mainUrl = 'http://localhost:5010';
        //   Apiurls
        this.getAllSites = "/api/sites/getActiveSites";
        this.getSitesForClients = "/api/sites/getSitesForClient";
        this.getAllOrders = "/api/orders/getOrders";
        this.getAllOrdersJSON = "/api/orders/getOrdersJSON";
        this.getOrderJSON = "/api/orders/getOrderJSON/";
        this.updateOrderJSON = "/api/orders/updateOrderJSON/";
        //  GET All Clients
        this.getAllClients = '/api/clients/getAllClients';
        //  User API's
        this.addUser = '/api/clientUser/add';
        this.getAllUsers = '/api/clientUser/searchClientUser';
        this.getUserById = '/api/clientUser/getClientUser/';
        this.updateById = '/api/clientUser/editClientUser/';
        this.deleteUser = '/api/clientUser/deleteClientUser/';
        this.updatePassword = '/api/clientUser/updatePassword';
        //  reports
        this.getAllOrdersForReports = "/api/orders/getAllOrdersForReports";
    }
};
ApiUrlsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiUrlsService);
export { ApiUrlsService };
//# sourceMappingURL=api-urls.service.js.map
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { environment } from "../../environments/environment";
let ApiServiceService = class ApiServiceService {
    constructor(apiUrls, http) {
        this.apiUrls = apiUrls;
        this.http = http;
    }
    getRoleName(value) {
        if (value === 20) {
            return "Ops Manager";
        }
        else if (value === 25) {
            return "Regional Manager";
        }
        else {
            return "Super User";
        }
    }
    get(subUrl) {
        return this.http.get(this.apiUrls.mainUrl + subUrl);
    }
    getAll(subUrl, query) {
        return this.http.post(this.apiUrls.mainUrl + subUrl, query);
    }
    orderExcel(tableId, fileName, col1, col2, rowLast) {
        const element = document.getElementById(tableId);
        const ws = XLSX.utils.table_to_sheet(element);
        ws['!cols'] = [];
        ws['!cols'][col1] = { hidden: true };
        ws['!cols'][col2] = { hidden: true };
        // @ts-ignore
        ws['!rows'][rowLast + 1] = { hidden: true };
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }
    update(subUrl, query) {
        return this.http.put(this.apiUrls.mainUrl + subUrl, query);
    }
    delete(subUrl) {
        return this.http.delete(this.apiUrls.mainUrl + subUrl);
    }
    importOrdersFromExcel(file) {
        const formData = new FormData();
        formData.append('fileKey', file, file.name);
        return this.http.post(environment.uploadOrders + '/api/noauth/orders/importOrdersFromExcel', formData);
    }
};
ApiServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiServiceService);
export { ApiServiceService };
//# sourceMappingURL=api-service.service.js.map
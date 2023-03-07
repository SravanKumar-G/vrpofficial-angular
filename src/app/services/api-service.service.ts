import {Injectable} from '@angular/core';
import {ApiUrlsService} from "@app/services/api-urls.service";
import {HttpClient} from "@angular/common/http";
import * as XLSX from 'xlsx';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {

    constructor(private apiUrls: ApiUrlsService, private http: HttpClient) {
    }

    getRoleName(value: any) {
        if (value === 5) {
            return "User";
        } else if (value === 30) {
            return "Admin";
        } else {
            return "";
        }
    }

    getEmpType(type: any) {
        if (type === 'govtEmp') {
            return 'Government Employee';
        } else if (type === 'nonGovtEmp') {
            return 'Non Government Employee'
        } else if (type === 'perEmp') {
            return 'Permanent Employment';
        } else {
            return 'Temporarily Employment';
        }
    }

    getContr(type: any) {
        if (type === '1') {
            return 'Work in your community/mohalla';
        } else if (type === '2') {
            return 'Become a digital activist';
        } else if (type === '3') {
            return 'Join calling campaigns';
        } else if (type === '4') {
            return 'Attend party events';
        } else if (type === '5') {
            return 'IT support (coding)';
        } else if (type === '6') {
            return 'Web design etc.';
        } else if (type === '7') {
            return 'Become a photo/video volunteer';
        } else if (type === '8') {
            return 'Provide housing to volunteers';
        } else if (type === '9') {
            return 'Content writing (mention preferred language below)';
        } else if (type === '10') {
            return 'Policy/Research support';
        } else {
            return 'Others';
        }
    }

    get(subUrl: any) {
        return this.http.get(this.apiUrls.mainUrl + subUrl);
    }

    getAll(subUrl: any, query: any) {
        return this.http.post(this.apiUrls.mainUrl + subUrl, query);
    }

    downloadExcel(tableId: any, fileName: any, col1: any, col2: any, rowLast: any): void {
        const element = document.getElementById(tableId);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        ws['!cols'] = [];
        ws['!cols'][col1] = {hidden: true};
        ws['!cols'][col2] = {hidden: true};
        // @ts-ignore
        ws['!rows'][rowLast + 1] = {hidden: true};
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }

    update(subUrl: any, query: any) {
        return this.http.put(this.apiUrls.mainUrl + subUrl, query);
    }

    delete(subUrl: any) {
        return this.http.delete(this.apiUrls.mainUrl + subUrl);
    }

    importOrdersFromExcel(file: any) {
        const formData: FormData = new FormData();
        formData.append('fileKey', file, file.name);
        return this.http.post<[]>(environment.uploadOrders + '/api/noauth/orders/importOrdersFromExcel', formData);
    }

    downloadZip(url: string, data: any) {
        // return this.http.post('http://192.168.0.134:8090' + url, data, {responseType: 'arraybuffer'});
        return this.http.post(environment.uploadOrders + url, data, {responseType: 'arraybuffer'});
    }
}

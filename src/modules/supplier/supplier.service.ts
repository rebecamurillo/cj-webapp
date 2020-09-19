import axios from 'axios';
import { SupplierInput } from './supplier.model';

const routeName = `/suppliers`;

export async function postSupplier(supplier: SupplierInput): Promise<any> {
    return await axios.post(process.env.VUE_APP_CJ_API_URL + routeName,
    supplier)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error post Supplier !');
            console.log(err);
            return {error : err};
        });
}

export async function getSuppliers(): Promise<any> {
    return await axios.get(process.env.VUE_APP_CJ_API_URL + routeName)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error Supplier !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteSupplier(dataToDelete: Array<any>): Promise<any> {
    const successData: any[] = [];
    const errorData: any[]= [];
    for (const prop in dataToDelete) {
        const data = dataToDelete[prop];

        await axios.delete(process.env.VUE_APP_CJ_API_URL + routeName + `/` + data.id)
            .then(resp => {
                successData.push(data);
            })
            .catch(err => {
                errorData.push(data);
                console.log('error');
                console.log(err);
            });
        }
    return {data: {successData: successData },
            error: {errorData: errorData}};
}

export async function updateSupplierById(id: number,data: SupplierInput): Promise<any> {
    return await axios.patch(process.env.VUE_APP_CJ_API_URL + routeName + `/` +id,data)
        .then(resp => {
            return {data: 'update ok'};
        })
        .catch(err => {
            console.log('error Supplier !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteSupplierById(id: number): Promise<any> {
    return await axios.delete(process.env.VUE_APP_CJ_API_URL + routeName + `/` +id)
        .then(resp => {
            return {data: 'delete ok'};
        })
        .catch(err => {
            console.log('error Supplier !');
            console.log(err);
            return {error : err};
        });
}
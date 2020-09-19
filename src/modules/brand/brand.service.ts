import axios from 'axios';
import { BrandInput } from './brand.model';

const routeName = `/brands`;

export async function postBrand(supplier: BrandInput): Promise<any> {
    return await axios.post(process.env.VUE_APP_CJ_API_URL + routeName,
    supplier)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error post Brand !');
            console.log(err);
            return {error : err};
        });
}

export async function getBrands(): Promise<any> {
    return await axios.get(process.env.VUE_APP_CJ_API_URL + routeName)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error Brand !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteBrand(dataToDelete: Array<any>): Promise<any> {
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

export async function updateBrandById(id: number,data: BrandInput): Promise<any> {
    return await axios.patch(process.env.VUE_APP_CJ_API_URL + routeName + `/` +id,data)
        .then(resp => {
            return {data: 'update ok'};
        })
        .catch(err => {
            console.log('error brand !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteBrandById(id: number): Promise<any> {
    return await axios.delete(process.env.VUE_APP_CJ_API_URL + routeName + `/` +id)
        .then(resp => {
            return {data: 'delete ok'};
        })
        .catch(err => {
            console.log('error brand !');
            console.log(err);
            return {error : err};
        });
}
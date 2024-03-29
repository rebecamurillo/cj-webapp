import axios from 'axios';
import { ProductInput } from './product.model';

const routeName = `/products`;

export async function postProduct(product: ProductInput): Promise<any> {
    return await axios.post(process.env.VUE_APP_CJ_API_URL + routeName,
    product)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error post Product !');
            console.log(err);
            return {error : err};
        });
}

export async function getProduct(): Promise<any> {
    return await axios.get(process.env.VUE_APP_CJ_API_URL + routeName)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error Product !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteProducts(dataToDelete: Array<any>): Promise<any> {
    const successData: any[] = [];
    const errorData: any[]= [];
    for (const prop in dataToDelete) {
        const data = dataToDelete[prop];

        await axios.delete(process.env.VUE_APP_CJ_API_URL + routeName + `/` +data.id)
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

export async function updateProductById(id: number,data: ProductInput): Promise<any> {
    return await axios.patch(process.env.VUE_APP_CJ_API_URL + routeName+ `/`+id,data)
        .then(resp => {
            return {data: 'update ok'};
        })
        .catch(err => {
            console.log('error Product !');
            console.log(err);
            return {error : err};
        });
}
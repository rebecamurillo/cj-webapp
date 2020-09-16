import axios from 'axios';
import { CategoryInput } from './category.model';

export async function postCategory(Category: CategoryInput): Promise<any> {
    return await axios.post(process.env.VUE_APP_CJ_API_URL + `/Categorys`,
    Category)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error post Category !');
            console.log(err);
            return {error : err};
        });
}

export async function getCategorysSorted(): Promise<any> {
    return await axios.get(process.env.VUE_APP_CJ_API_URL + `/Categorys/order`)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error Category !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteCategorys(dataToDelete: Array<any>): Promise<any> {
    const successData: any[] = [];
    const errorData: any[]= [];
    //dataToDelete.forEach(async function(data) {
    for (const prop in dataToDelete) {
        const data = dataToDelete[prop];

        await axios.delete(process.env.VUE_APP_CJ_API_URL + `/Categorys/`+data.id)
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

export async function updateCategoryById(id: number,data: any): Promise<any> {
    return await axios.patch(process.env.VUE_APP_CJ_API_URL + `/Categorys/`+id,data)
        .then(resp => {
            return {data: 'update ok'};
        })
        .catch(err => {
            console.log('error Category !');
            console.log(err);
            return {error : err};
        });
}
import axios from 'axios';
import { ClassificationInput } from './classification.model';

export async function postClassification(classification: ClassificationInput): Promise<any> {
    return await axios.post(process.env.VUE_APP_CJ_API_URL + `/classifications`,
    classification)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error post classification !');
            console.log(err);
            return {error : err};
        });
}

export async function getClassificationsSorted(): Promise<any> {
    return await axios.get(process.env.VUE_APP_CJ_API_URL + `/classifications/order`)
        .then(resp => {
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error classification !');
            console.log(err);
            return {error : err};
        });
}

export async function deleteClassifications(dataToDelete: Array<any>): Promise<any> {
    const successData: any[] = [];
    const errorData: any[]= [];
    //dataToDelete.forEach(async function(data) {
    for (const prop in dataToDelete) {
        const data = dataToDelete[prop];

        await axios.delete(process.env.VUE_APP_CJ_API_URL + `/classifications/`+data.id)
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

export async function updateClassificationById(id: number,data: any): Promise<any> {
    return await axios.patch(process.env.VUE_APP_CJ_API_URL + `/classifications/`+id,data)
        .then(resp => {
            return {data: 'update ok'};
        })
        .catch(err => {
            console.log('error classification !');
            console.log(err);
            return {error : err};
        });
}
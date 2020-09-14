import axios, { AxiosResponse } from 'axios';
import { LoginInput } from './auth.model';

export async function login(loginData: LoginInput): Promise<any> {
    return axios.post(process.env.VUE_APP_CJ_API_URL + `/auth/login`,
            loginData)
        .then(resp => {
            const token = 'Bearer ' + resp.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            axios.defaults.headers.common['Authorization'] = token;
            return {data: resp.data};
        })
        .catch(err => {
            console.log('error login in !');
            console.log(err);
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('user-token');
            return {error : err};
        });
}

export async function logout(): Promise<any> {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
}

export async function whoAmI(): Promise<AxiosResponse<any>>{
    //let res = null;
    return await axios.get(process.env.VUE_APP_CJ_API_URL + `/whoAmI`);
        // .then(resp => {
        //     console.log('resp');
        //     console.log(resp);
        //     //res = resp;
        // })
        // .catch(err => {
        //     console.log('err');
        //     console.log(err);
        // });
    //return res;
}
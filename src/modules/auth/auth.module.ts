import axios from 'axios';
import { LoginInput } from './auth.model';

export async function login(loginData: LoginInput): Promise<any> {
    axios.post(process.env.VUE_APP_CJ_API_URL + `/auth/login`,
            loginData)
        .then(resp => {
            console.log('resp');
            console.log(resp);
            const token = resp.data.token
            localStorage.setItem('user-token', token) // store the token in localstorage
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                //resolve(resp)
        })
        .catch(err => {
            console.log('err');
            console.log(err);
            //todo also in delete action
            delete axios.defaults.headers.common['Authorization']
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                //reject(err)
        });
}


export async function whoAmI(): Promise<any>{
    let res = null;
    res = await axios.get(process.env.VUE_APP_CJ_API_URL + `/whoAmI`)
        .then(resp => {
            console.log('resp');
            console.log(resp);
            //res = resp;
        })
        .catch(err => {
            console.log('err');
            console.log(err);
        });
    return res;
}
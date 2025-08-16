import axios from 'axios';
import router from "@/router";

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.status === 403){
        router.push('/login').then(r => {
            alert("请(重新)登录")
        });
        return;
    }
    return Promise.reject(error);
});

export default axios;
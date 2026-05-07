import axios from 'axios';
import router from "@/router";

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const status = error?.response?.status ?? error?.status;

    // 仅在后台管理页面触发登录过期处理，避免公开页首屏加载出现无意义弹窗
    const isAdminPage = router.currentRoute.value.matched.some(record => record.meta.admin);
    if ((status === 401 || status === 403) && isAdminPage) {
        router.push('/login').then(() => {
            alert("请(重新)登录")
        });
    }

    return Promise.reject(error);
});

export default axios;
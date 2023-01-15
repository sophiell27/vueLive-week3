import {baseUrl, path} from "./config.js"; 

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


const app = createApp({
    data(){
        return{
            loginUser: {
                username: "",
                password: ""
            },
            alertMsg: "",
        }
    },
    methods: {
        login(user){
            // console.log(`${baseUrl}/admin/signin`, user);
            axios.post(`${baseUrl}/admin/signin`, user)
            .then(res => {
                const {expired, token } = res.data;
                document.cookie =  `vueToken=${token}; expires= ${new Date(expired)}`
                window.location.href = "admin.html"
            })
            .catch(err => {
                console.dir(err.message)
                // console.log(err.response.error.message);
            })
        },
        alert(){
            confirm(this.alertMsg)
        }
    },
    mounted() {

    }
});


app.mount("#app")
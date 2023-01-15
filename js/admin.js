import {baseUrl, path} from "./config.js"; 

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let addNewModal = null;
let editModal = null;
const app = createApp({
    data() {
        return {
            productsData: [],
            tempProduct: {
                // title: "",
                // category: "",
                // origin_price: "",
                // price: 0,
                // unit: "",
                // description: "",
                // content: "",
                // is_enabled: 1,
                // imageUrl: "",
                // imagesUrl: [""],
                
            },
            tempCat: [],
        }
    },
    methods: {
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${baseUrl}/api/user/check`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                confirm("請先登入");
                window.location = "index.html";
            })
        },
        // startNewImg(){
        //     this.tempProduct.imagesUrl = [""];
        // },
        getProductData(){
            axios.get(`${baseUrl}/api/sophiee22/admin/products/all`)
            .then(res => {
                this.productsData =  Object.values(res.data.products);
                // console.log(this.productsData);
            })
            .catch(err => {
                if (err){
                    alert("獲取產品資料錯誤，請檢查路徑或新增產品！");
                }
            })
            
        },
        addNewData(){
            if (!this.tempProduct.imagesUrl || !this.tempProduct.imagesUrl[0].length || !this.tempProduct.imageUrl){
                alert("請填寫所有欄位");
                return;
            }else {
                axios.post(`${baseUrl}/api/${path}/admin/product`, {
                    "data": this.tempProduct
                })
                .then( res => {
                    alert(res.data.message);
                    // console.log(res);
                    addNewModal.hide();
                    this.getProductData();
                })
                .catch( err => {
                    alert(err.response.data.message);
                })
            }
        },
        
        editProduct(producTitle,productId){
            if (confirm(`是否確定更新「${producTitle}」產品資料？`)){
                axios.put(`${baseUrl}/api/${path}/admin/product/${productId}`,
                {
                    "data": this.tempProduct
                  }
                )
                .then(res => {
                    alert(`${res.data.message}`);
                    this.tempProduct = {};
                    editModal.hide();
                    // console.log(this.tempProduct);
                })
                .catch(err => {
                    console.log(err);
                })
            }
            
        },
        deleteSingleProduct(productId,productTitle){
            if ( confirm(`是否確定刪除「${productTitle}」？`)){
            axios.delete(`${baseUrl}/api/${path}/admin/product/${productId}`)
            .then(res => {
                alert(res.data.message);
                this.getProductData();
            })
            .catch( err => {
                alert(err.response.data.message);
            })
            }
        }
    },
    mounted(){
        this.checkLogin();
        
        addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'), {
            keyboard: true
          });

        editModal = new bootstrap.Modal(document.getElementById('editModal'), {
        keyboard: true
        });

        this.getProductData();
        
    }
});


app.mount("#app");
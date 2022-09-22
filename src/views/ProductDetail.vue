<template>

</template>

<script>
export default {
    name: "ProductDetail",
    data(){
        return {
            productId: 0,
            productDetail: {},
            productImage: [],
            total: 1,
            totalPrice: 0
        }
    },
    created(){
        this.productId = this.$route.query.product_id;
        this.getProductDetail();
        this.getProductImage();
    },
    methods: {
        calculatePrice(cnt){
            let total = this.total + cnt;
            if(total < 1) {
                total = 1;
            }
            this.total = total;
            this.totalPrice = this.productDetail * this.total;
        },
        getCurrencyFormat(value){
            return this.$currencyFormat(value);
        },
        async getProductDetail(){
            let productDetail = await this.$api("/api/productDetail", {param: [this.productId]});
            if(productDetail.length > 0){
                this.productDetail = productDetail[0];

            }
        }
    }
}
</script>

<style scoped>

</style>
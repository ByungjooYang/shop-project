<template>
    <main class="mt-3">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div :class="`carousel-item ${i===0?'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                                <img :src="`/download/${productId}/${pimg.path}`" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
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
                this.totalPrice = this.totalPrice = this.productDetail.product_price * this.total;

            }
            console.log(this.productDetail);
        },
        async getProductImage(){
            this.productImage = await this.$api("/api/productMainImages", {param: [this.productId]});
            console.log("this.productImage", this.productImage);
        }
    }
}
</script>

<style scoped>

</style>
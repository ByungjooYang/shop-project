<template>
    <main></main>
</template>

<script>
export default {
    name: "SalesList",
    data(){
        return {
            productList:[]
        };
    },
    created(){
        this.getProductList();
    },
    methods: {
        async getProductList(){
            this.productList = await this.$api("/api/productList2", {});
            console.log(this.productList);
        },
        goToInsert(){
            this.$router.push({path:'/create'});
        },
        goToDetail(product_id){
            this.$router.push({path:'/detail', query: {product_id: product_id}});
        },
        goToUpdate(product_id){
            this.$router.push({path:'/update', query: {product_id: product_id}});
        },
        goToImage(product_id){
            this.$router.push({path:'/image_insert', query: {product_id: product_id}});
        },
        deleteProduct(product_id){
            this.$swal.fire({
                title: "정말 삭제하시겠습니까?",
                showCancelButton: true,
                confirmButtonText: "삭제",
                cancelButtonText: "취소"

            }).then(async (result) => {
                if(result.isConfirmed){
                    console.log(product_id);
                    await this.$api("/api/productDelete", {param: [product_id]});
                    this.getProductList();
                    this.$swal.fire("삭제되었습니다.", "", "success");
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
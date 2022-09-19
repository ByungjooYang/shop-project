<template>
    <div>
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>
<script>
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
export default {
    components: {Footer, Header},
    computed: {
        user(){
            return this.$store.state.user;
        }
    }
}
</script>
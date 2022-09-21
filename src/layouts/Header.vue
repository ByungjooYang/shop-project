<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Soldout</a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">홈</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">제품리스트</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/detail">제품상세페이지</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sales">제품등록페이지</router-link>
                    </li>
                    <li v-if="user.email==undefined">
                        <button type="button" class="btn btn-danger" @click="kakaoLogin">
                            로그인
                        </button>
                    </li>
                    <li v-else>
                        <button type="button" class="btn btn-danger" @click="kakaoLogout">
                            로그아웃
                        </button>
                    </li>
                </ul>
                <form class="form-control">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn=outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    computed: {
        user(){
            return this.$store.state.user;
        }
    },
    methods: {
        kakaoLogin(){
            window.Kakao.Auth.login({
                scope: "profile, account_email, gender",
                success: this.getProfile
            });
        },
        getProfile(authObj) {
            console.log(authObj);
            window.Kako.API.request({
                url : "/v2/user/me",
                success: res => {
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account);
                    this.login(kakao_account);
                    alert("로그인 성공");
                }
            });
        },
        async login(kakao_account){
            await this.$api("/api/login", {
                param: [
                    {email: kakao_account.email, nickname: kakao_account.profileß.nickname},
                    {nickname: kakao_account.profile.nickname}
                ]
            });

            this.$store.commit("user", kakao_account);
        },
        kakaoLogout(){
            window.Kakao.Auth.logout((response) => {
                console.log(response);
                this.$store.commit("user", {});
                alert("로그아웃");
                this.$router.push({path: "/"});
            });
        }
    }
}
</script>

<style scoped>

</style>
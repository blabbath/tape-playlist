<template>
    <header>
        <p class="app-title">MixTape</p>
        <div class="header-nav" v-if="token">
            <router-link cds-layout="m-x:md" to="Recorder">Home</router-link>
            <router-link cds-layout="m-x:md" to="About">About</router-link>
            <a href="./">Logout</a>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {}
    },

    computed: {
        token() {
            return this.$store.state.auth.token
        },
    },
}
</script>
<style>
header {
    background-color: black;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 2rem;
}

header a {
    text-decoration: none;
    color: #fff;
    font-weight: 300;
}

.app-title {
    font-weight: 300;
    font-size: 1.2rem;
}

.header-nav a {
    text-decoration: none;
    color: #fff;
    font-weight: 300;
    margin-left: 0.8rem;
}
</style>

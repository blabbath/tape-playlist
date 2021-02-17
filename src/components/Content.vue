<template>
    <div v-if="accessToken" class="content" layout wide>
        <div class="content-container" cds-layout="grid">
            <app-search :token="accessToken" cds-layout="col@md:6"></app-search>
            <app-tape :token="accessToken" cds-layout="col@md:6"></app-tape>
        </div>
    </div>
    <div v-else><app-login></app-login></div>
</template>
<script>
import AppLogin from './Login.vue'
import AppSearch from './Search.vue'
import AppTape from './Tape.vue'

export default {
    components: { AppLogin, AppSearch, AppTape },
    data() {
        return {
            token: null,
        }
    },

    created: function () {
        this.$store.commit('getToken')
    },
    computed: {
        accessToken() {
            return this.$store.state.token
        },
    },
}
</script>
<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('/tape.png');
    background-repeat: no-repeat;
    background-size: 200% auto;
    background-position-x: center;
    margin: 1rem 0;
}

@media only screen and (min-width: 992px) {
    .content {
        margin: 2rem;
        background-size: 100% auto;
    }
}

.content-container {
    margin: 1rem;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>

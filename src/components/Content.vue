<template>
    <div class="content" layout wide>
        <div v-if="token" class="content-container" cds-layout="grid">
            <app-search :token="token" cds-layout="col@md:6"></app-search>
            <app-tape cds-layout="col@md:6"></app-tape>
        </div>
        <div v-else>
            <app-login></app-login>
        </div>
    </div>
</template>
<script>
import AppLogin from './Login.vue'
import AppSearch from './Search.vue'
import AppTape from './Tape.vue'
import hash from '../assets/hash'

export default {
    components: { AppLogin, AppSearch, AppTape },
    data() {
        return {
            token: null,
        }
    },

    mounted: function () {
        this.token = hash.access_token
    },
}
</script>
<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../../public/tape.png');
    background-repeat: no-repeat;
    background-size: 200% auto;
    background-position-x: center;
    margin: 1rem 0;
}

.content-container {
    margin: 1rem;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>

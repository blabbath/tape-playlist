<template>
    <div class="content" layout wide>
        <div class="content-container" cds-layout="grid">
            <app-search :token="token" cds-layout="col@md:6"></app-search>
            <app-tape :token="token" cds-layout="col@md:6"></app-tape>
        </div>
    </div>
</template>
<script>
import AppSearch from '../components/Search.vue'
import AppTape from '../components/Tape.vue'

export default {
    components: { AppSearch, AppTape },
    data() {
        return {
            token: null,
        }
    },
    mounted() {
        if (!this.$store.state.token) {
            this.$store.commit('getToken')
        }
    },
    computed: {
        token() {
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

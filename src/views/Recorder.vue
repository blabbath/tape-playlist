<template>
    <div class="content" layout wide>
        <div class="content-container">
            <app-search :token="token"></app-search>
            <app-tape :token="token"></app-tape>
            <app-create :token="token"></app-create>
        </div>
    </div>
</template>
<script>
import AppSearch from '../components/Search.vue'
import AppTape from '../components/Tape.vue'
import AppCreate from '../components/CreateMixtape.vue'

export default {
    components: { AppSearch, AppTape, AppCreate },
    data() {
        return {}
    },

    beforeCreate() {
        if (!this.$store.state.token) {
            this.$store.commit('getToken')
            if (!this.$store.state.token) {
                window.location.href = '/'
            }
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
    height: calc(100% - 80px);
    background-image: url('/tape.png');
    background-repeat: no-repeat;
    background-size: 200% auto;
    background-position-x: center;
    margin: 1rem 0;
}

@media only screen and (min-width: 992px) {
    .content {
        margin: 2rem 2rem 0;
        background-size: 100% auto;
    }
}

.content-container {
    margin: 1rem;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>

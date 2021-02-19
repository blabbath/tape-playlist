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
import AppPlayer from '../components/Player.vue'

export default {
    components: { AppSearch, AppTape, AppCreate, AppPlayer },
    data() {
        return {}
    },

    beforeCreate() {
        if (!this.$store.state.auth.token) {
            this.$store.commit('getToken')
            if (!this.$store.state.auth.token) {
                window.location.href = '/'
            }
        }
    },

    computed: {
        token() {
            return this.$store.state.auth.token
        },
    },
}
</script>
<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% -3rem -80px);
    margin: 3rem 1rem 0;
    overflow-y: auto;
}

.content-container {
    margin: 1rem 1rem;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>

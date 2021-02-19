<template>
    <div class="tape-container" layout wide>
        <div
            cds-layout="grid cols@sm:12 cols@xl:6 align:horizontal-center"
            class="sides"
        >
            <div cds-text="section" class="side-container">
                <app-side
                    :alertMessage="sideA"
                    :tracks="tracksA"
                    title="Side A"
                    sideIdentifier="sideA"
                ></app-side>
            </div>
            <div cds-text="section" class="side-container">
                <app-side
                    :alertMessage="sideB"
                    :tracks="tracksB"
                    title="Side B"
                    sideIdentifier="sideB"
                ></app-side>
            </div>
        </div>
    </div>
</template>
<script>
import AppSide from './Side.vue'

export default {
    components: { AppSide },

    computed: {
        tracksA() {
            return this.$store.state.tape.sides.sideA
        },

        sideA() {
            return this.$store.state.tape.alerts.sideA
        },

        tracksB() {
            return this.$store.state.tape.sides.sideB
        },

        sideB() {
            return this.$store.state.tape.alerts.sideB
        },
    },
}
</script>
<style>
.tape-container {
    padding: 1rem 0;
    width: 80%;
}

.side-container {
    width: 95%;
}
</style>

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
            return this.$store.state.sides.sideA
        },

        sideA() {
            return this.$store.state.alerts.sideA
        },

        tracksB() {
            return this.$store.state.sides.sideB
        },

        sideB() {
            return this.$store.state.alerts.sideB
        },
    },
}
</script>
<style>
.tape-container {
    /*     position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 30%;
    margin: 0 auto; */
    padding: 1rem 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 3px;
    border: 1px solid #666666;
    width: 90%;
}

/* @media only screen and (min-width: 768px) {
    .tape-container {
        top: 32%;
        width: 90%;
    }
}
@media only screen and (min-width: 992px) {
    .tape-container {
        top: 28%;
        width: 80%;
    }
}

@media only screen and (min-width: 1440px) {
    .tape-container {
        top: 30%;
    }
} */

.side-container {
    width: 95%;
}
</style>

<template>
    <header>
        <a href="./">MixTape</a
        ><span><cds-icon shape="headphones" size="36"></cds-icon></span>
    </header>
</template>
<script>
export default {
    data() {
        return {}
    },
}
</script>
<style>
header {
    background-color: black;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 2rem;
}

header a {
    text-decoration: none;
    color: #fff;
}
</style>

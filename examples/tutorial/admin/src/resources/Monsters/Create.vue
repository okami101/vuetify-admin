<template>
    <va-create>
        <monsters-form :title="title" :item="item"></monsters-form>
    </va-create>
</template>

<script>
import MonstersForm from "./Form";

export default {
    props: ["title", "item"],
    components: {
        MonstersForm,
    },
};
</script>

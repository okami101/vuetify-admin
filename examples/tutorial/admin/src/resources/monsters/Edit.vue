<template>
    <va-edit>
        <monsters-form :id="id" :title="title" :item="item"></monsters-form>
    </va-edit>
</template>

<script>
import MonstersForm from "./Form";

export default {
    props: ["id", "title", "item"],
    components: {
        MonstersForm,
    },
};
</script>

<template>
    <va-edit>
        <monsters-form :id="id" :title="title" :item="item"></monsters-form>
    </va-edit>
</template>

<script>
export default {
    props: ["id", "title", "item"],
};
</script>

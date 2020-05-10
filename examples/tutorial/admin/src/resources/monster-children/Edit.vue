<template>
    <va-edit>
        <monster-children-form
            :id="id"
            :title="title"
            :item="item"
        ></monster-children-form>
    </va-edit>
</template>

<script>
export default {
    props: ["id", "title", "item"],
};
</script>

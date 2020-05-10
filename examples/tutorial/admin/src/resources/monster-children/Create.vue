<template>
    <va-create>
        <monster-children-form
            :title="title"
            :item="item"
        ></monster-children-form>
    </va-create>
</template>

<script>
export default {
    props: ["title", "item"],
};
</script>

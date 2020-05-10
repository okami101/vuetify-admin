<template>
    <base-material-card :icon="resource.icon" :title="title">
        <va-list
            :filters="[
                'q',
                {
                    source: 'monster',
                    type: 'autocomplete',
                    reference: 'monsters',
                    optionText: 'name',
                    multiple: true,
                },
            ]"
            :include="['monster']"
            flat
            v-slot="props"
            v-model="selected"
            :options.sync="options"
        >
            <va-datagrid
                :fields="[
                    {
                        source: 'monster',
                        type: 'reference',
                        reference: 'monsters',
                        optionText: 'name',
                    },
                    'name',
                    { source: 'created_at', type: 'date', format: 'long' },
                    { source: 'updated_at', type: 'date', format: 'long' },
                ]"
                :sortable="['name', 'created_at', 'updated_at']"
                v-bind="props"
                v-model="selected"
                :options.sync="options"
            >
            </va-datagrid>
        </va-list>
    </base-material-card>
</template>

<script>
export default {
    props: ["resource", "title"],
    data() {
        return {
            options: {},
            selected: [],
        };
    },
};
</script>

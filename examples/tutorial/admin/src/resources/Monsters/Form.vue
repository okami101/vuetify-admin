<template>
    <va-form :id="id" :item="item" :saving.sync="saving" v-model="model">
        <v-row justify="center">
            <v-col sm="6">
                <base-material-card>
                    <template v-slot:heading>
                        <div class="display-2">
                            {{ title }}
                        </div>
                    </template>
                    <v-card-text>
                        <va-text-input source="name" required></va-text-input>
                        <va-text-input source="email" required></va-text-input>
                        <va-text-input source="label" required></va-text-input>
                        <va-boolean-input source="active"></va-boolean-input>
                        <va-number-input
                            source="level"
                            required
                        ></va-number-input>
                        <va-rating-input source="rating"></va-rating-input>
                        <va-number-input
                            source="price"
                            format="currency"
                            required
                        ></va-number-input>
                        <va-text-input
                            source="description"
                            multiline
                        ></va-text-input>
                        <va-rich-text-input source="body"></va-rich-text-input>
                        <va-select-input
                            source="category"
                            required
                        ></va-select-input>
                        <va-autocomplete-input
                            source="tags"
                            multiple
                            taggable
                        ></va-autocomplete-input>
                        <va-date-input
                            source="publication_date"
                            format="long"
                            required
                        ></va-date-input>
                        <va-file-input source="avatar">
                            <va-image-field
                                source="avatar"
                                clearable
                            ></va-image-field>
                        </va-file-input>
                        <va-file-input source="images">
                            <va-image-field
                                source="images"
                                multiple
                                clearable
                            ></va-image-field>
                        </va-file-input>
                        <va-file-input source="files">
                            <va-file-field
                                source="files"
                                multiple
                                clearable
                            ></va-file-field>
                        </va-file-input>
                    </v-card-text>
                    <va-save-button :saving="saving"></va-save-button>
                </base-material-card>
            </v-col>
        </v-row>
    </va-form>
</template>

<script>
export default {
    props: ["id", "title", "item"],
    data() {
        return {
            saving: false,
            model: {},
        };
    },
};
</script>

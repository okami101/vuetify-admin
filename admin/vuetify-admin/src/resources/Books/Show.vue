<template>
  <va-show>
    <va-tabbed-show>
      <va-tab id="attributes" icon="mdi-eye" :label="$t('tabs.attributes')">
        <va-text-field source="isbn"></va-text-field>
        <va-text-field source="title"></va-text-field>
        <va-text-field source="description"></va-text-field>
        <va-text-field source="author"></va-text-field>
        <va-text-field source="publication_date"></va-text-field>
      </va-tab>
      <va-tab id="summary" icon="mdi-text" :label="$t('tabs.summary')">
        <va-rich-text-field
          source="summary"
          :add-label="false"
        ></va-rich-text-field>
      </va-tab>
    </va-tabbed-show>
  </va-show>
</template>

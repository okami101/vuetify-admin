import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "SimpleForm",
  computed: {
    ...mapState({
      resource: state => state.api.resource,
      resourceName: state => state.api.resourceName
    }),
    ...mapGetters({
      can: "api/can"
    })
  },
  methods: {
    ...mapActions({
      save: "form/save"
    }),
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        await this.save();
        this.$router.push(`/${this.resourceName}`);
      } catch (e) {}
    }
  }
};

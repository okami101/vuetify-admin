import { mapState } from "vuex";
import ActionPage from "../components/Layouts/ActionPage";

export default {
  components: {
    ActionPage
  },
  props: {
    title: [String, Function]
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource,
      resourceName: state => state.api.resourceName
    })
  }
};

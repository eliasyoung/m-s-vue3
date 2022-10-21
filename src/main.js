import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
const BaseDialog = () => import("@/components/ui/BaseDialog.vue");

Vue.config.productionTip = false;

Vue.component("BaseCard", BaseCard);
Vue.component("BaseButton", BaseButton);
Vue.component("BaseBadge", BaseBadge);
Vue.component("BaseSpinner", BaseSpinner);
Vue.component("BaseDialog", BaseDialog);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";

Vue.config.productionTip = false;

Vue.component("BaseCard", BaseCard);
Vue.component("BaseButton", BaseButton);
Vue.component("BaseBadge", BaseBadge);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

<template>
  <div>login
    <h-button long type="primary">确定</h-button>
    <h-button type="primary">确定</h-button>
    <h-button type="primary" loading>确定</h-button>
    <h-tabbars :tabList="list" @handlerTabbar="handlerTabbar" style='margin-top: 10px'></h-tabbars>
  </div>
</template>
<script type="text/javascript">
import HTabbars from "@/components/tabbars/tabbars.vue";
export default {
  components: {
    HTabbars
  },
  data() {
    return {
      list: [
        {
          name: "123",
          icon: "h__icon--date"
        },
        {
          name: "456",
          icon: "h__icon--date"
        }
      ]
    };
	},
	methods: {
		handlerTabbar(item) {
			console.log(item)
		}
	}
};
</script>
<template>
  <div class="tabbars">
    <div class="header">
      <div
        class="tabbar"
        v-for="(item,index) in tabList"
        :key="index"
        @click="handlerTabbar(item,$event)"
      >
			<i :class="item.icon" style='pointer-events:none'></i>			
			{{item.name}}
			</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [];
      }
		},
		showNum: {
			type:Number,
			default: 0
		}
  },
  data() {
    return {};
  },
  methods: {
    handlerTabbar(item, e) {
      let arr = Array.from(document.querySelectorAll(".tabbar"));
      arr.forEach(item => {
        item.className = 'tabbar'
      });
			// console.log(e);
			e.path[0].className = 'tabbar focus'
      this.$emit("handlerTabbar", item);
		},
		handlerFirstClick() {
      let arr = Array.from(document.querySelectorAll(".tabbar"));
			arr[this.showNum].click()
		}
	},
	mounted () {
		this.handlerFirstClick()
	}
};
</script>

<style lang="scss">
.tabbars {
  display: block;
  overflow: hidden;
  border-bottom: 4px solid #5a86dd;
  .header {
    float: left;
  }
  .tabbar {
    display: inline-block;
    height: 50px;
    width: 120px;
    text-align: center;
    line-height: 50px;
    margin-left: 20px;
    background-color: #f0f0f0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
		cursor: pointer;
  }
  .focus {
    background-color: #5a86dd;
    color: #fff;
  }
}
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uview-ui/index.scss";
	/* 图标库 */
	@import "/static/css/iconfont.css";
	/* 动画库 */
	@import "/static/css/animate.css";
	/* 样式库 */
	@import '/static/css/thinco.scss';
	//模板改动111
	@import "ReView/fontawesome.css";
	@import "Review/component.css";
	//模板改动111
</style>
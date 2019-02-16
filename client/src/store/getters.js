// 包含多个基于state的getter计算属性的对象
export default {
	// 播放视频的遮罩层
	showMask (state) {
		return state.video.playStatus
	}

}
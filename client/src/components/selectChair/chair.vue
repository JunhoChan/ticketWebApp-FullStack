<template>
<div>
	<div class="chair pr normal" v-if="selectedStatus===1" @click="seletedChair">
		<div class="chair-left pa normal"></div>
		<div class="chair-right pa normal"></div>
		<div class="chair-back pa normal" ></div>
	</div>
	<div class="chair pr selectd" v-if="selectedStatus===2" @click="seletedChair">
		<div class="chair-left pa selectd"></div>
		<div class="chair-right pa selectd"></div>
		<div class="chair-back pa selectd" ></div>
	</div>	
	<div class="chair pr sell" v-if="selectedStatus===3">
		<div class="chair-left pa sell"></div>
		<div class="chair-right pa sell"></div>
		<div class="chair-back pa sell" ></div>
	</div>					
</div>
</template>

<script>
export default {
	data() {
		return {
			selectedStatus: 1, // 1 可以操作 2 选中 3已卖
		}
	},
	methods: {
		seletedChair () {
			let str = this.row.toString() + this.column.toString()		
			if(this.selectedStatus === 1) {
				this.selectedStatus = 2
				this.$emit('selectdStatus',1) //  选择位置多一位
				this.$emit('setUserSelPos', str ,1) // 用户选位的pos
			}else {
				this.selectedStatus = 1  
				this.$emit('selectdStatus',-1)	// -1
				this.$emit('setUserSelPos', str ,0)									
			}
		}
	},
	props: {
		chairStatus: Number, // 1 可以操作 2 选中 3已卖
		row:Number, // 行
		column:Number, // 列
	},
	created () {
		this.selectedStatus = this.chairStatus
	}
}
</script>

<style>
.chair {
	width:2rem;
	height:2rem;
	border-radius:10px;	
}
.chair-back {
	width:1.8rem;
	z-index:5;
	height:.3rem;
	bottom:0rem;
	left:0rem;
}
.chair-left {
	width:.3rem;
	height:1.45rem;
	left:-.4rem;
	bottom:0;
}
.chair-right {
	width:.3rem;
	height:1.45rem;
	right:-.4rem;
	bottom:0;
}
.normal {
	background-color:#fff;
	border:1px solid #dfe5ec;	
}
.selectd {
	background-color:#4fe862;
	border:1px solid #27be3a;	
}
.sell {
	background-color:#e29c9d;
	border:1px solid #be2729;	
}
</style>
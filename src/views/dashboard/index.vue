<template>
  <el-row>
    <el-col :span="6">
      <div class="list">
        <div class="list-item">
          <div class="dot"></div>
          <div>
            <div class="time">2023-03-22 17:56</div>
            <div>您的商品已确认收货</div>
          </div>
        </div>
        <div class="list-item active">
          <div class="dot"></div>
          <div>
            <div class="time">2023-03-22 17:56</div>
            <div>您的商品已确认收货您的商品已确认收货您的商品已确认收货</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card">
        <div class="head">asdasd</div>
        <div class="content">
          <div class="goods-item">
            <span>得力 5901 抽杆夹 (单位:只) 混色</span>
            <span>1件</span>
          </div>
          <div class="goods-item">
            <span>得力 5901 抽杆夹 (单位:只) 混色</span>
            <span>1件</span>
          </div>
          <div class="goods-item">
            <span>得力 5901 抽杆夹 (单位:只) 混色</span>
            <span>1件</span>
          </div>
          <div class="expand">
            展开剩余
          </div>
        </div>
        <div class="head">
          <div>物流信息</div>
          <span class="detail">物流详情</span>
        </div>
        <div class="logistics-content">
          <div class="logistics-item">
            <span class="label">发货单号</span>
            <span class="value">123123</span>
          </div>
          <div class="logistics-item">
            <span class="label">发货单号</span>
            <span class="value">123123</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
}
</script>
<style scoped>
.card {
  border: 1px solid #E8E8E8;
  border-radius: 16px;
  overflow: hidden;
}
.head {
  height: 50px;
  background: #F7F7F7;
  padding: 17px 0 17px 60px;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #F7F7F7;
  border-top: 1px solid #F7F7F7;
}
.content {
  padding: 20px 60px;
}
.goods-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: #3E3A39;
  margin-bottom: 16px;
}
.expand {
  font-size: 14px;
  line-height: 20px;
  color: #999494;
  text-align: center;
  padding-top: 4px;
}
.detail {
  font-size: 14px;
  line-height: 20px;
  color: #318CF8;
  margin-right: 16px;
  cursor: pointer;
}
.logistics-content {
  padding: 24px 0 30px 60px;
}
.logistics-item:not(:last-child) {
  margin-bottom: 16px;
}
.label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #999494;
}
.value {
  font-size: 14px;
  line-height: 20px;
  color: #3E3A39;
}

.dot {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-color: #808080;
  margin-right: 49px;
  border-radius: 50%;
}
.list-item {
  display: flex;
  padding-bottom: 30px;
  position: relative;
}
.list-item::after {
  position: absolute;
  content: '';
  width: 1px;
  background-color: #D5D1D1;
  height: 100%;
  left: 8px;
  top: 0;
  z-index: -1;
}
.active.list-item .dot {
  background-color: #318CF8;
}
.time {
  margin-bottom: 10px;
}
</style>

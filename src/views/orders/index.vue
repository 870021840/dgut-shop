<template>
  <div>
    <dg-breadcrumb :items="items"></dg-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="query"
            placeholder="请输入订单内容"
            size="normal"
          ></el-input
        ></el-col>
      </el-row>

      <el-table :data="goods" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.update_time | dateFormate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-share"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DGBreadcrumb from "@/components/DGBreadcrumb.vue";
import { getOrders } from "@/api/goodAPI";
export default {
  data() {
    return {
      items: ["权限管理", " 权限列表", "xxx", "yyy"],
      query: "",
      pagenum: 1,
      pagesize: 5,
      total: 0,
      //商品信息
      goods: []
    };
  },

  components: {
    "dg-breadcrumb": DGBreadcrumb
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.requestOrders();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.requestOrders();
    },
    requestOrders() {
      getOrders(this.query, this.pagenum, this.pagesize).then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("请求订单列表有误");
        this.goods = res.data.goods;
        this.total = res.data.total;
        console.log(res);
      });
    }
  },
  created() {
    this.requestOrders();
  }
};
</script>

<style scoped></style>

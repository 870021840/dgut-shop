import request from "@/utils/request.js";

// 订单数据列表
export function getOrders(query, pagenum, pagesize) {
  return request.get("/orders", {
    params: {
      query,
      pagenum,
      pagesize
    }
  });
}

<template>
  <div>
    <dg-breadcrumb :items="['权限管理', '角色列表']"></dg-breadcrumb>
    <el-card>
      <el-button type="primary" size="mini">添加角色</el-button>
      <el-table :data="roles" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="index1 === 0 ? 'bottomLine topLine' : 'bottomLine'"
              v-for="(level1, index1) in scope.row.children"
              :key="level1.id"
              align="middle"
              type="flex"
            >
              <el-col :span="5">
                <el-tag closable @close="removeTag(scope.row, level1.id)">
                  {{ level1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="
                    level1.children.length - 1 == index2 ? '' : 'bottomLine'
                  "
                  v-for="(level2, index2) in level1.children"
                  :key="level2.id"
                  align="middle"
                  type="flex"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeTag(scope.row, level2.id)"
                    >
                      {{ level2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      v-for="level3 in level2.children"
                      :key="level3.id"
                      @close="removeTag(scope.row, level3.id)"
                    >
                      {{ level3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" class="el-icon-delete"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              class="el-icon-setting"
              @click="allotRights(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限dialog -->
    <el-dialog title="分配权限" :visible.sync="dialogAllotRightVisible">
      <el-tree
        ref="rightTree"
        default-expand-all
        :data="allRights"
        :props="rightProps"
        node-key="id"
        :default-checked-keys="defCheckedKey"
        show-checkbox
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotRightVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAllotRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DGBreadcrumb from "@/components/DGBreadcrumb.vue";
import {
  getRoles,
  deleteRight,
  getRightTree,
  authorization
} from "@/api/rightAPI";
export default {
  data() {
    return {
      //所有的角色
      roles: [],
      //控制分配权限dialog是否显示
      dialogAllotRightVisible: false,
      //分配权限里头所有的权限
      allRights: [],
      //映射
      rightProps: {
        children: "children",
        label: "authName"
      },
      // 默认选中的节点
      defCheckedKey: [],
      //当前编辑的角色信息
      curRole: {}
    };
  },

  components: {
    "dg-breadcrumb": DGBreadcrumb
  },

  methods: {
    //提交权限修改
    submitAllotRight() {
      // 获取所有的选中节点ID
      const checkedKeys = this.$refs.rightTree.getCheckedKeys();
      const halfCheckedKeys = this.$refs.rightTree.getHalfCheckedKeys();
      const rids = [...checkedKeys, ...halfCheckedKeys].join(",");
      //分配权限
      authorization(this.curRole.id, rids).then(res => {
        if (res.meta.status !== 200) return this.$message.error("分配权限有误");
        this.$message.success("分配权限成功");
        //对话框关闭
        this.dialogAllotRightVisible = false;
        //清空选中节点
        this.defCheckedKey = [];
        //刷新数据
        this.requestRole();
      });
    },
    //分配权限点击
    allotRights(curRole) {
      this.curRole = curRole;
      //处理下默认选中了哪些
      this.getLeafNode(curRole);
      // curRole.children.forEach(level1 => {
      //   level1.children.forEach(level2 => {
      //     level2.children.forEach(level3 => {
      //       this.defCheckedKey.push(level3.id);
      //     });
      //   });
      // });
      getRightTree().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("获取权限列表树失败");
        this.dialogAllotRightVisible = true;
        this.allRights = res.data;
      });
    },
    //获取选中的子节点
    getLeafNode(node) {
      //最后一层的id添加到defCheckedKey
      if (node.children === undefined) {
        return this.defCheckedKey.push(node.id);
      }
      //递归
      node.children.forEach(e => {
        this.getLeafNode(e);
      });
    },
    //请求角色列表
    requestRole() {
      getRoles().then(res => {
        if (res.meta.status !== 200)
          return this.$message.error("获取角色列表错误");
        console.log(res);
        this.roles = res.data;
      });
    },
    //点击移除权限标签
    removeTag(role, rightId) {
      console.log("role:", role, "rightID", rightId);

      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteRight(role.id, rightId).then(res => {
          if (res.meta.status !== 200)
            return this.$message.error("删除权限失败");
          this.$message.success("删除权限成功");
          // this.requestRole();
          role.children = res.data;
        });
      });
    }
  },
  created() {
    this.requestRole();
  }
};
</script>

<style scoped>
.topLine {
  border-top: 1px solid #eee;
}
.bottomLine {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 8px;
}
</style>

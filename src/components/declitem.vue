 <template>
  <el-dialog title="编辑" :visible.sync="dialogTableVisible">
    <el-form
      :model="declitemRow"
      class="demo-form-inline"
      label-width="90px"
      :inline="true"
      size="mini"
      style="font-size: 10px"
    >
      <el-form-item label="PO">{{declitemRow.EBELN}}</el-form-item>
      <el-form-item label="POItem">{{declitemRow.EBELP}}</el-form-item>
      <el-form-item label="Declitem">
        <el-input v-model="decl"></el-input>
        <el-button type="primary" icon="el-icon-zoom-in" @click="queryDeclitem"></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="resultData" @row-click="rowClick" style="width: 100%; margin-bottom: 40px;" height="500" border>
      <el-table-column
        v-for="(item, index) in declitemLable"
        :key="index"
        :col="item"
        :prop="item.prop"
        :label="item.label"
        width="180"
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import {queryDecl} from "../api/mainpo";

export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    declitemRow: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      decl: "",
      resultData: [],
      declitemLable: [
        {
          prop: "DECLITEM",
          label: "底帐序号(Declitem)"
        },
        {
          prop: "MATNR",
          label: "内部料号(Inner Material)"
        },
        {
          prop: "CGEWEI",
          label: "单位(Unit)"
        },
        {
          prop: "ZGEWEI",
          label: "单位(Unit1)"
        },
        {
          prop: "TAX_CODE",
          label: "HSCODE"
        },
        {
          prop: "SMAKTX",
          label: "中文品名(Smaktx)"
        },
        {
          prop: "CLASS",
          label: "规格说明(Description)"
        },
        {
          prop: "RETRC",
          label: "管制(Limit)"
        },
        {
          prop: "BRGEW",
          label: "征税方式(Tax Method)"
        },
        {
          prop: "SEQNO",
          label: "3C"
        }
      ]
    };
  },
  methods: {
    queryDeclitem() {
      let data = {
        BUKRS: this.declitemRow.BUKRS,
        ACCNO: this.declitemRow.ACCNO,
        DECLITEM: this.decl
      };
      queryDecl(JSON.stringify(data))
        .then(res => {
          this.resultData = res.data;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    rowClick(row) {
      this.dialogTableVisible = false
      this.$emit('rowClick', row)
    }
  }
};
</script>>

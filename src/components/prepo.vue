 <template>
  <el-dialog title="原进口po" :visible.sync="dialogTableVisible">
    <el-table :data="prepoData" style="width: 100%; margin-bottom: 40px;" height="500" border>
      <el-table-column
        v-for="(item, index) in prepoLable"
        :key="index"
        :col="item"
        :prop="item.prop"
        :label="item.label"
        width="180"
      ></el-table-column>
      <el-table-column label="Attachment" width="150">
          <template slot-scope="scope">
              <el-button type="text" v-on:click="queryAttachment(scope.row)">click here</el-button>
          </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    prepoData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      prepoLable: [
        {
          prop: "BUKRS",
          label: "Company"
        },
        {
          prop: "EBELN",
          label: "PO"
        },
        {
          prop: "EBELP",
          label: "PO.Item"
        },
        {
          prop: "DECLITEM",
          label: "Declitem"
        },
        {
          prop: "TAX_CODE",
          label: "H.S.Code"
        },
        {
          prop: "SMAKTX",
          label: "Description"
        },
        {
          prop: "ZGEWEI",
          label: "Unit"
        },
        {
          prop: "CGEWEI",
          label: "Unit(CN)"
        }
      ]
    };
  },
  methods: {
    
    // rowClick(row) {
    //   this.dialogTableVisible = false
    //   this.$emit('rowClick', row)
    // }
  }
};
</script>>

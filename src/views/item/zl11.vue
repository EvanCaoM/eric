<template>
  <div class="box" id="zl11">
    <div class="title" align="left">
      <i class="el-icon-circle-plus"></i>
      <span>料号归并</span>
    </div>
    <el-card id="card">
      <div class="cardHead">
        <el-divider content-position="left">查询条件</el-divider>
        <el-form
          ref="form"
          v-model="form"
          class="demo-form-inline"
          label-width="90px"
          :inline="true"
          size="mini"
          style="font-size: 10px"
        >
          <el-form-item label="Company">
            <el-select v-model="form.BUKRS" placeholder="请选择">
              <el-option
                v-for="item in bukrs"
                :key="item.drpValue"
                :label="item.drpText"
                :value="item.drpValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IsRegiestered">
            <el-select v-model="form.IsRegiestered" placeholder="请选择">
              <el-option
                v-for="item in DFLAG"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VendorCode">
            <el-input v-model="form.Vendorcode"></el-input>
          </el-form-item>
          <el-form-item label="HsCode">
            <el-input v-model="form.TAX_CODE"></el-input>
          </el-form-item>
          <el-form-item label="Matnr">
            <el-input v-model="form.MATNR"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.SMAKTX"></el-input>
          </el-form-item>
          <el-form-item label="Declitem">
            <el-input v-model="form.DECLITEM"></el-input>
          </el-form-item>
          <el-form-item label="Available">
            <el-select v-model="form.DFLAG" placeholder="请选择">
              <el-option
                v-for="item in DFLAG"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IsToTWW">
            <el-select v-model="form.IsToTWW" placeholder="请选择">
              <el-option
                v-for="item in DFLAG"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Mat.Type">
            <el-select v-model="form.MatType" placeholder="请选择">
              <el-option
                v-for="item in MatType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="料号类型">
            <el-select v-model="form.Type" placeholder="请选择">
              <el-option
                v-for="item in Type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="From">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.dateFrom"
              value-format="yyyyMMdd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="To">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.dateTo"
              value-format="yyyyMMdd"
            ></el-date-picker>
          </el-form-item>
          <div class="leftDiv">
            <el-button type="primary" icon="el-icon-search" @click="queryData" size="mini">query</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveData" size="mini">save</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deleteData" size="mini">delete</el-button>
            <el-button type="primary" icon="el-icon-download" @click="downloadData" size="mini">download</el-button>
          </div>
        </el-form>
      </div>
      <div>
        <el-divider content-position="left">Results</el-divider>
      </div>
      <div class="cardBody" style="margin-top:20px">
        <el-container style="height: auto; border: 1px solid #eee">
          <el-main>
            <el-table
              ref="multipleTable"
              :data="pageData"
              style="width: 100%; margin-bottom: 40px;"
              height="500"
              border
              :row-style="finalRowStyle"
              :cell-style="finalCellStyle"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" fixed="left"></el-table-column>
              <el-table-column fixed="left" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleDeclitem(scope.row)" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>                  
              <el-table-column
                v-for="(item, index) in resultLable1"
                :key="index"
                :col="item"
                :prop="item.prop"
                :label="item.label"
                width="180"
              ></el-table-column>
              <el-table-column label="3CFlag">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.MARK">
                    <el-option
                      v-for="item in mark"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.REMARK">
                    <el-option
                      v-for="item in remark"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="能效">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.CELFLAG">
                    <el-option
                      v-for="item in celflag"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                v-for="(item, index) in resultLable2"
                :key="index"
                :col="item"
                :prop="item.prop"
                :label="item.label"
                width="180"
              ></el-table-column>
              <el-table-column label="Download" width="150">
                <template slot-scope="scope">
                  <el-button type="text" v-on:click="queryImportPO(scope.row)">Download</el-button>
                </template>
              </el-table-column>
              <el-table-column label="Locked" width="150">
                <template slot-scope="scope">
                  <el-button type="text" v-on:click="queryImportPO(scope.row)">锁定/解锁</el-button>
                </template>
              </el-table-column>
            </el-table>



            <div class="block">
              <el-pagination
                v-on:size-change="handleSizeChange"
                v-on:current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </el-main>
        </el-container>
      </div>
      <declitem
        @rowClick="inputDeclitem"
        :dialogTableVisible="editDialogFormVisible"
        :declitemRow="declitemRow"
      ></declitem>
      <prepo :prepoVisible="prepoVisible" :prepoData="prepoData"></prepo>
    </el-card>
  </div>
</template>


<script>
// 本机ip
var ipq = "";

import {
  queryMainpo,
  deletePo,
  savePo,
  getComcode,
  getUser,
  getPrePO,
  queryPR
} from "../../api/mainpo";
import {queryZL11, deletePo as ddd} from "../../api/zl11"
import declitem from "../../components/declitem";
import prepo from "../../components/prepo";

export default {
  components: {
    declitem: declitem
  },
  data() {
    return {
      userIp: "",
      pageSize: 10,
      currentPage: 1,
      total: 0,
      multipleSelection: [],
      loading: false,
      editDialogFormVisible: false,
      prepoVisible: false,
      // 原进口po
      prepoData: [],
      // 要归并的行
      declitemRow: {},
      // 查询条件表单
      form: {
        BUKRS: "",
        IsRegiestered: "",
        Vendorcode: "",
        TAX_CODE: "",
        MATNR: "",
        SMAKTX: "",
        DECLITEM: "",
        DFLAG: "",
        IsToTWW: "",
        MatType: "",
        Type: "",
        DateFrom: "",
        DateTo: ""
      },
      // result标签
      resultLable1: [
        {
          prop: "BUKRS",
          label: "Bukrs"
        },
        {
          prop: "MATNR",
          label: "Matnr(料号)"
        },
        {
          prop: "MAKTX",
          label: "Shorttext(申购品名)"
        },
        {
          prop: "SMAKTX_U",
          label: "Description(中文说明)"
        },
        {
          prop: "price",
          label: "Price"
        },
        {
          prop: "WAERS",
          label: "Currency"
        },
        {
          prop: "IsToTww",
          label: "IsToTww"
        },
        {
          prop: "Vendorcode",
          label: "Vendorcode"
        },
        {
          prop: "Vendor",
          label: "Vendor"
        },

        {
          prop: "Type",
          label: "料号类型"
        },
        {
          prop: "MEINS",
          label: "申购单位"
        },

        {
          prop: "DECLITEM",
          label: "底账序号"
        },
        {
          prop: "MA_MATNR",
          label: "Mat.No"
        },
        {
          prop: "ZGEWEI",
          label: "备案单位"
        },
        {
          prop: "CGEWEI",
          label: "B.Unit(CN)"
        },
        {
          prop: "TAX_CODE",
          label: "H.S.CODE"
        },
        {
          prop: "SMAKTX",
          label: "备案品名"
        },
        {
          prop: "BRGEW",
          label: "征税"
        }
      ],
      resultLable2: [
        {
          prop: "CRNAME",
          label: "Crname(申请人)"
        },
        {
          prop: "CRDATE",
          label: "Crdate(申请时间)"
        },
        {
          prop: "ID",
          label: "ID"
        },
      ],

      pageData: [],
      // result数据
      resultData: [],
      bukrs: [],
      DFLAG: [
        {
          value: "N",
          label: "N"
        },
        {
          value: "Y",
          label: "Y"
        },
        {
          value: "ALL",
          label: "ALL"
        }
      ],
      MatType: [
        {
          value: "备品料号",
          label: "备品料号"
        },
        {
          value: "成品料号",
          label: "成品料号"
        },
        {
          value: "治具料号",
          label: "治具料号"
        },
        {
          value: "BU6/BU8耗材",
          label: "BU6/BU8耗材"
        },
        {
          value: "MRO料号",
          label: "MRO料号"
        },
        {
          value: "其他料号",
          label: "其他料号"
        },
        {
          value: "All",
          label: "未选择"
        }
      ],

     
      Type: [
        {
          value: "",
          label: "All"
        },
        {
          value: "自主报关",
          label: "自主报关"
        },
        {
          value: "代理报关",
          label: "代理报关"
        },
        {
          value: "放弃退税",
          label: "放弃退税"
        },
        {
          value: "免报免备",
          label: "免报免备"
        }
      ],
      mark: [
        {
          value: "",
          label: "All"
        },
        {
          value: "0",
          label: "不涉及"
        },
        {
          value: "1",
          label: "目录外"
        },
        {
          value: "2",
          label: "免办3C"
        },
        {
          value: "3",
          label: "提供证书"
        },
        {
          value: "4",
          label: "通过达伟"
        },
        {
          value: "5",
          label: "国内交货"
        },
        {
          value: "6",
          label: "3C"
        }
      ],
      remark: [
        {
          value: "0",
          label: "无备注"
        },
        {
          value: "1",
          label: "商品归类确认书"
        },
        {
          value: "2",
          label: "预归类备案书"
        },
        {
          value: "3",
          label: "预归类意见书"
        },
        {
          value: "4",
          label: "急件无预归类文件"
        },
        {
          value: "5",
          label: "拒绝提供预归类文件"
        },
        {
          value: "6",
          label: "境外设备"
        },
        {
          value: "7",
          label: "半年内报废"
        },
        {
          value: "8",
          label: "一年内报废"
        },
        {
          value: "9",
          label: "半年内退运"
        },
        {
          value: "10",
          label: "一年内退运"
        },
        {
          value: "11",
          label: "关联方"
        },
        {
          value: "12",
          label: "其他"
        }
      ],
      celflag: [
        {
          value: "0",
          label: "不涉及"
        },
        {
          value: "1",
          label: "备案声明"
        },
        {
          value: "2",
          label: "能源效率检测报告认可单"
        },
        {
          value: "3",
          label: "目录外"
        },
        {
          value: "4",
          label: "特殊情况声明"
        },
        {
          value: "5",
          label: "通过达伟"
        },
        {
          value: "6",
          label: "国内交货"
        },
        {
          value: "7",
          label: "CEL"
        }
      ]
    };
  },
  methods: {
    queryData() {
      this.userIp = ipq;

      this.resultData = [];
      this.pageData = [];
      this.loading = true;
      queryZL11(JSON.stringify(this.form))
        .then(res => {
          this.resultData = res.data;
          this.pageData = this.resultData.slice(
            this.pageSize * this.currentPage - this.pageSize,
            this.pageSize * this.currentPage
          );
          this.total = this.resultData.length;
          this.loading = false;
        })
        .catch(function(error) {
          alert(error);
          this.loading = false;
        });
    },
    saveData() {
      savePo(this.multipleSelection)
        .then(res => {
          if(res.data.status == 1){
            alert("Save Error！  " + res.data.msg)
          }else{
            alert("Save Successfully!");
          }
        })
        .catch(error => console.log(error));
    },
    deleteData() {
      let dataForm = {
        data : this.multipleSelection,
        ip : ipq
      }
      deletePo(JSON.stringify(dataForm)).then(res => {
        if(res.data.status == 1){
            alert("Delete Error！  " + res.data.msg)
          }else{
            alert("Delete Successfully!");
          }
      })
      .catch(error => console.log(error));
    },
    downloadData() {
          //excel数据导出
         require.ensure([], () => {
           const {
             export_json_to_excel
           } = require('../../assets/js/Export2Excel');
           const tHeader = ['序号','姓名', '用户名', '性别'];
           const filterVal = ['BUKRS','EBELN', 'EBELP', 'DECLITEM'];
           const list = this.pageData;
           const data = this.formatJson(filterVal, list);
           export_json_to_excel(tHeader, data, '用户列表');
         })
       },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 弹出底账序号页面
    editClick(row) {
      this.editDialogFormVisible = true;
    },
    // 点击底账序号自动填充底账序号
    inputDeclitem(row) {
      this.editDialogFormVisible = false;
      var dr = this.resultData.find(
        x =>
          x.EBELN == this.declitemRow.EBELN && x.EBELP == this.declitemRow.EBELP
      );
      var reg = /^((54)|(67)|(68))/;


      // 相同po号相同描述的po直接带出
      this.pageData.forEach(samePo => {
        if (samePo.EBELN == dr.EBELN && samePo.TXZ01 == dr.TXZ01) {
          samePo.DECLITEM = row.DECLITEM;
          samePo.MATNR = row.MATNR;
          samePo.CGEWEI = row.CGEWEI;
          samePo.ZGEWEI = row.ZGEWEI;
          samePo.TAX_CODE = row.TAX_CODE;
          samePo.SMAKTX = row.SMAKTX;
          this.$refs.multipleTable.toggleRowSelection(samePo, true);

          //境外PO
          if (
            dr.LIFNR == "QCI_MRO" ||
            dr.LIFNR.substring(dr.LIFNR.length - 1, dr.LIFNR.length) == "F"
          ) {
            samePo.BRGEW = row.BRGEW;
          }

          if (
            row.RETRC == "Y" ||
            (reg.test(dr.EBELN) && dr.vendortype == "放弃退税")
          ) {
            // TODO 管制，不知道还要不要，暂时去掉
            var ztcurr;
            if (dr.TCURR != "")
                ztcurr = parseFloat(dr.TCURR);
            else
                ztcurr = 1;
            var netpr = parseFloat(dr.NETPR);//单价
            var per = parseFloat(dr.PEINH);//per
            if (netpr * ztcurr / per >= 100) {
                samePo.RETRC = "X"
            }
          } else {
            samePo.RETRC = ""
          }
        }
      });
    },
    dialogHanderHide() {
      this.isShow = false;
    },
    handleDeclitem(row) {
      this.declitemRow = row;
      this.editDialogFormVisible = true;
    },
    getBukrs() {
      getComcode(ipq).then(res => (this.bukrs = res.data));
    },
    getUserIP(onNewIP) {
      //  onNewIp - your listener function for new IPs
      //compatibility for firefox and chrome
      var myPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
          iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }

      //create a bogus data channel
      pc.createDataChannel("");

      // create offer and set local description
      pc.createOffer()
        .then(function(sdp) {
          sdp.sdp.split("\n").forEach(function(line) {
            if (line.indexOf("candidate") < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });

          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(function(reason) {
          // An error occurred, so handle the failure to connect
        });

      //sten for candidate events
      pc.onicecandidate = function(ice) {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    },
    getIp() {
      this.getUserIP(function(ip) {
        alert(ip)
        ipq = ip;
      });
    },
    queryImportPO(row) {
      let data = {
        BUKRS: row.BUKRS,
        EBELN: row.EBELN,
        EBELP: row.EBELP
      };
      getPrePO(JSON.stringify(data)).then(res => {
        if (res.data.status == 1) {
          alert(res.data.msg);
        } else {
          this.prepoVisible = true;
          this.prepoData = res.data.data;
        }
      });
    },
    queryPRAttach(row) {
      let data = {
        BUKRS: row.BUKRS,
        EBELN: row.EBELN
      };
      queryPR(data)
        .then(res => {
          window.open(
            "http://QCIBPM/bpmportal/Program/GWF063/GWF063_Query.aspx?&QID=" +
              res.data,
            "_blank"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    statusChange(row){
      row.STATUS == "1" ? "0" : "1"
    },

    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageData = this.resultData.slice(
        val * this.currentPage - val,
        val * this.currentPage
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageData = this.resultData.slice(
        this.pageSize * val - this.pageSize,
        this.pageSize * val
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //单元格样式
    finalCellStyle({ row, column, rowIndex, columnIndex }) {
      return { padding: "4px" };
    },
    finalRowStyle({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 == 0) {
        return { background: "#F0F2F3" };
      }
    }
  },
  mounted() {
    this.getIp();
    // this.getIp()
    this.getBukrs();
  }
};
</script>

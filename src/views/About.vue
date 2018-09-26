<template>
  <div class="main home">
    <h2>{{tag}}</h2>
    <ul class="catalog-box">
      <li v-for="item,index in catalog">
        <a @click="goAnchor('anchor'+index)" href="javascript:void(0)">{{index+1}}.{{item.title}}</a>
      </li>
    </ul>
    <ul class="api-info">
      <li class="apiinfo-list" v-for="item,index in catalog" :id="'anchor'+index">
        <h3>{{index+1}}.{{item.title}}</h3>
        <div class="api-gaiyao">
          <span class="api-url float-l">url:</span>
          <a class="api-content float-l" href="javascript:void(0)">{{item.url}}</a>
        </div>
        <div class="api-gaiyao">
          <span class="api-method float-l">method:</span>
          <a class="api-content float-l" href="javascript:void(0)">{{item.method}}</a>
        </div>
        <div>
          <strong>参数列表</strong>
        </div>
        <table class="table table-striped table-bordered" v-for="parameters,key in item.parameters" v-if="parameters.length>0">
          <caption>{{key}}</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>参数名</th>
              <th>类型</th>
              <th>必须</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="params,index in parameters">
              <td>{{index+1}}</td>
              <td>{{params.name}}</td>
              <td>{{params.type || params.schema.type}}</td>
              <td>{{params.required}}</td>
              <td>{{params.description}}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <strong>返回结果</strong>
        </div>
        <pre class="responses">
          {{JSON.stringify(item.responses, null, 2)}}
        </pre>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catalog: [], //目录
      test1: "123456"
    };
  },
  computed: {
    paths() {
      return this.$store.state.apiDoc.paths;
    },
    tag() {
      return this.$route.params.id;
    },
    apiDoc() {
      return this.$store.state.apiDoc;
    }
  },
  created() {
    let that = this;
    // 格式化数据
    // this.checkParamsDefinition(this.paths)
    this.checkParamsDefinition(this.paths)
    for (let key1 in that.paths) {
      for (let key2 in that.paths[key1]) {
        if (that.paths[key1][key2]["tags"].indexOf(that.tag) > -1) {
          let obj = that.paths[key1][key2];
          let params = {
            header: [],
            query: [],
            body: [],
            path: []
          };
          obj.parameters.forEach(v => {
            if(v.schema&&v.schema.$ref){
              let arr = [];
              for(let proKey in v.schema.$ref.properties){
                arr.push({
                  name:proKey,
                  type:v.schema.$ref.properties[proKey].type,
                  required:v.schema.$ref.properties[proKey].allowEmptyValue,
                  description:v.schema.$ref.properties[proKey].description
                })
              }
              params[v.in] = arr
            }else{
              params[v.in].push(v);
            }
          });
          that.catalog.push({
            url: key1,
            method: key2,
            title: obj.summary,
            // parameters:obj.parameters,
            parameters: params,
            responses: that.formatResponses(obj.responses)
          });
        }
      }
    }
    console.log(that.paths);
  },
  mounted() {

  },
  methods: {
    goAnchor(selector) {
      var anchor = document.getElementById(selector);
      document.documentElement.scrollTop = anchor.offsetTop;
    },
    /**
     * 获取实体类
     */
    getDefinition(schema) {
      return this.apiDoc["definitions"][schema.split("/")[2]];
    },
    /**
     * 将$ref改为相应的对象
     */
    checkParamsDefinition(obj) {
      let that = this;
      for (let key in obj) {
        if (typeof obj[key] == 'object') {
          that.checkParamsDefinition(obj[key]);
        } else if (key == "$ref" && typeof obj[key] == 'string') {
          obj[key] = that.getDefinition(obj[key]);
          that.checkParamsDefinition(obj[key])
        }
      }
    },
    formatResponses(responses){
      let res = responses
      return res;
    }
  }
};
</script>
<style lang="less" scoped>
.catalog-box {
  padding: 20px 0;
  border-bottom: 1px dotted #eee;
}
.api-info {
  .apiinfo-list {
    .api-gaiyao {
      overflow: hidden;
      margin-bottom: 10px;
    }
    .api-content {
      margin-left: 10px;
    }
    .table {
      // margin-top: 20px;
      caption {
        caption-side: top;
      }
    }
    .responses {
      background: #0f0f0f;
      color: #fec243;
    }
  }
}
</style>


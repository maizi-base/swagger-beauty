export default class Utils {
    formatJson(json){
        let formatJson
        return format
    }
    /**
     * 替换对应key的值
     * @param {Object} obj 
     * @param {String} repKey 
     */
    replaceObjKey(obj, repKey,repValue){
        let that = this;
        for (let key in obj) {
            if (key != repKey && typeof obj[key] == 'object') {
                that.replaceObjKey(obj[key]);
            } else if (key == repKey) {
                // obj[key] = that.getDefinition(obj[key]);
                obj[key] = repValue
            }
        }
    }
}
module.exports = function(broccoli) {
  this.ext;
  this.type;
  this.size;
  this.base64;
  this.isPrivateMaterial = false;
  this.publicFilename;

  // クライアント側の選択ファイルからResourceDbを作成
  this.readSelectedLocalFile = function(fileInfo, callback) {
    this.publicFilename = "";
    this.size = fileInfo.size;
    this.ext = fileInfo.name;
    this.type = fileInfo.type;
    // this.base64 = fileInfo.size; // <- resourceMgr.resetBase64FromBin(resKey, callback)で更新
    var reader = new FileReader();
    reader.onload = function(evt) {
      callback(evt.target.result);
    }
    reader.onerror = function(error) {
      console.log(error);
    };
    reader.readAsDataURL(fileInfo);
  }

  // 要らないキーを削除
  this.fixed = function(obj) {
    var fixedObj = {};
    for (k in obj) {
      if (typeof obj[k] !== "undefined" || typeof obj[k] !== "function") {
        fixedObj[k] = obj[k];
      }
    }
    return fixedObj;
  }
}

module.exports = {
  makeid: function (toto) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  check_zombie: function (zombie_list,zombie_ip) {
    var arrFound = zombie_list.filter(function(item){
      return item.ip_address == zombie_ip;
    });
    if(arrFound.length > 0){
      return arrFound;
    }
    return false;
  }
};

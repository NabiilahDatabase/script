// BULK ACTION MENU (NO ARGS)
// KEEP CS

var e = selectedEntries();
var jum = 0;
var now = moment().toDate().getTime();

//FUNGSI MEMBUAT UNIQUE ID
function uid(x)  {
   var a = [1,2,3,4,5,6,7,8,9];
   var n; var r=[];
   for (n=1; n<=x; ++n) {
      var i = Math.floor((Math.random()*(9-n))+1);
      r.push(a[i]);
      a[i] = a[9-n];
   }
   var uid = "";
   for (i = 0; i < x; i++) {
      uid += r[i] + "";
   }
   return uid;
}

for (var i in e) { //loop
var statusKeep = e[i].field("Status Keep");

if (statusKeep=="Belum") { //stat
     e[i].set("Status Keep","Keep");
     e[i].set("Waktu Keep",now);
     jum++;
  } //stat
} //loop

if (statusKeep=="Export") { //stat
     var newBcd = Number(now)+Number(uid(4)) + "-" + uid(4);
     e[i].set("Status Keep","Keep");
     e[i].set("Waktu Keep",now);
     jum++;
  } //stat
} //loop

message(jum+" barang sudah masuk list keep ndoro");

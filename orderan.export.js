// MEMENTO SCRIPT NAME: Export Web
// TYPE: Action Script
// TEMPAT ACTION: Bulk Actions Menu
// REQUARED: moment.min.js

var e = selectedEntries();
var jum = 0;
var now = moment().toDate().getTime();
var http = http();

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

// Ubah Status tiap barang
function ubahStatus(i) {
    e[i].set("Status Keep","Export");
}

function bulatkan(n) {
  if (n>1000) {
   var h = (Math.floor((n/1000))*1000);
   var x = n - h;
   if (x<=200) {
      return (h/1000);
   } else {
      return (h/1000)+1;
   }
  } else { return 1 }
}

var penerima = e[0].field("Penerima");
var kodeCS = e[0].field("Kode CS");
http.headers({"content-type": "application/json"});

for (var i in e) { //loop
    var barang = e[i].field("Nama Barang");
    var warna = e[i].field("Warna");
    var bcd = e[i].field("Barcode");
    var toko = e[i].field("Toko");
    var harga = e[i].field("Harga Beli");
    var host = "https://firestore.googleapis.com/v1beta1/projects/nabiilah-duit/databases/(default)/documents/orderan?documentId="+bcd+"&key=AIzaSyAaC_P9vm-hnCA0TqejEgYeySKLMawYOnY";

    var data = {
        "fields": {
            "barcode": {"stringValue": bcd},
            "barang": {"stringValue": barang},
            "warna": {"stringValue": warna},
            "cs": {"stringValue": kodeCS},
            "penerima": {"stringValue": penerima},
            "toko": {"stringValue": toko},
            "hargaBeli": {"stringValue": harga},
            "status": {"stringValue": "export"},
            "pj": {"stringValue": ""},
        }
    }
    data = JSON.stringify(data).replace(/["]/g, `\\"`);

    result = http.post(host, data);
    var cek = result.body;
    var error = cek.search(new RegExp("error","i"));
    if(error==-1) {
      ubahStatus(i);
      jum++;
    } else {
      message("FORMAT ERROR:\n"+data);
    }

    if (e.length==jum) {
        message("Export Berhasil");
    }
    // var db = "https://firestore.googleapis.com/v1beta1/projects/nabiilah-duit/databases/(default)/documents/closing/"+iid+"/barang?documentId="+bcd+"&key=AIzaSyAaC_P9vm-hnCA0TqejEgYeySKLMawYOnY";
    // var tmp = "{\"mapValue\": {\"fields\": {\"barcode\": {\"integerValue\": \""+bcd+"\"}, \"toko\": {\"stringValue\": \""+toko+"\"}, \"nama\": {\"stringValue\": \""+barang+"\"}, \"warna\": {\"stringValue\": \""+warna+"\"}, \"berat\": {\"integerValue\": \""+beratBrg+"\"}, \"harga\": {\"integerValue\": \""+harga+"\"}}}}";
    //http.headers({"content-type": "application/json"});
    //var res = http.post(db, dataBrg);
    //message(dataBrg);
} //loop

// var data = "{\"fields\": {\"service\": {\"stringValue\": \""+serv+"\"}, \"cs\": {\"stringValue\": \""+kodeCS+"\"}, \"nPenerima\": {\"stringValue\": \""+hpP+"\"}, \"nPengirim\": {\"stringValue\": \""+hpD+"\"}, \"ekspedisi\": {\"stringValue\": \""+eksp+"\"}, \"alamat\": {\"stringValue\": \""+alamat+"\"}, \"berat\": {\"integerValue\": \""+beratBulat+"\"}, \"bank\": {\"stringValue\": \""+bank+"\"}, \"status\": {\"stringValue\": \"Cek Mutasi\"}, \"ongkir\": {\"integerValue\": \""+ongkir+"\"}, \"pengirim\": {\"stringValue\": \""+pengirim+"\"}, \"diskon\": {\"integerValue\": \""+diskon+"\"}, \"penerima\": {\"stringValue\": \""+penerima+"\"},\"deposit\": {\"integerValue\": \""+deposit+"\"}, \"listBarang\": {\"arrayValue\": {\"values\": ["+listBarang+"]}}}}";
//}
//message(jum+" barang sudah masuk Closingan");

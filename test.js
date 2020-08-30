const mysql = require("mysql");
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'SQL_vai-25071999',
	database:'blog'
  });
  const vals = ['The sunset','https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','Sunset is the time when the sun goes down and night begins. During the sunset, nature assumes fresh, bright, and charming. The sun seems to be a disc of gold. At the time of sunset, one can enjoy the serenity of a sunset. Then nature seems in a hurry. People finish their work and return home. Birds return to their nests. The cowboys become busy with returning home with cattle. When the sun sets, nature looks very beautiful. Then the nature starts getting dark. The slight darkness of the sunset creates a feeling of joy and tranquility in us. The beauty of the sunset helps a poet to generate any ideas and compose poems.'];
// console.log(vals);
//     connection.query(`INSERT INTO blogs(_id,title,image,body,created_date) values(NULL,?,CURDATE())`,[vals],(err,res)=>{
//       if(err){
//           throw err;
//       }
//       else{
//           console.log(res);
//       }
//   });
const vals2 = ['The waterfall','https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','Sunset is the time when the sun goes down and night begins. During the sunset, nature assumes fresh, bright, and charming. The sun seems to be a disc of gold. At the time of sunset, one can enjoy the serenity of a sunset. Then nature seems in a hurry. People finish their work and return home. Birds return to their nests. The cowboys become busy with returning home with cattle. When the sun sets, nature looks very beautiful. Then the nature starts getting dark. The slight darkness of the sunset creates a feeling of joy and tranquility in us. The beauty of the sunset helps a poet to generate any ideas and compose poems.','2'];
  const sql = `UPDATE blogs SET title = ?,image = ?,body = ?,created_date = CURRDATE() where _id = ?`;
  connection.query(sql,[vals2],(err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log(res);
    }
});
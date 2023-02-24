const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const fs = require("fs")
const bodyParser = require('body-parser')

const {nocache, provideUserHash, ensureLoggedIn} = require("./middleware")

const PROJECT_PATH = path.resolve(__dirname+ "/../..")
const componentPath = path.resolve(__dirname+ "/..")
const componentName = path.basename(componentPath)
const envFile = PROJECT_PATH+'/settings.ini' 
const secretFile = PROJECT_PATH+'/secrets.ini' 

console.log(`Component '${componentName} is loading envFile '${envFile}'`)
dotenv.config({ debug: false,path: envFile })
dotenv.config({ debug: false,path: secretFile })


const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PWD,
  port: 5432,
  ssl: {
    rejectUnauthorized : false,
    ca : fs.readFileSync(__dirname+"/hetzner.pem").toString()
  }
})


function die(msg){
    console.log(msg)
    process.exit(1)
}

const app = express();
const PORT = process.env.PORT_GAMIFICATION || die("missing env variable PORT_GAMIFICATION");
const LOCALHOST = process.env.LOCALHOST || die("missing env variable LOCALHOST");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))


app.get('/gamification/like', nocache, provideUserHash, (req, res) => {
  const hash = req.headers['x-hash'];
  const objectId =  req.query.objectId

  if(!hash) {
    pool.query("SELECT count(1) FROM public.likes where object_id = $1 " , [objectId])
    .then( (sql)=>{
      res.json({
        count: sql.rows[0].count,
        canLike: false
      });
    })
  } 
  else {
    pool.query(`SELECT count(1) filter ( where object_id = $1) as likes_all,
                       count(1) filter ( where object_id = $1 and user_id = $2) as likes_user
                       from public.likes` , [objectId, hash])
    .then( (sql)=>{

      res.json({
        count: parseInt(sql.rows[0].likes_all),
        canLike: parseInt(sql.rows[0].likes_user)===0,
      });
    })
  }
});

app.post('/gamification/like', nocache, ensureLoggedIn, (req, res) => {
  const hash = req.headers['x-hash'];
  const objectId =  req.body.objectId
  pool.query("INSERT into public.likes(user_id, object_id) values ($1, $2) " , [hash, objectId])
  .catch( ()=>{
    // ignore dublicate key constraint. Maybe the user has already voted for an object. 
  })
  .finally( ()=>{
    pool.query("SELECT count(1) FROM public.likes where object_id = $1 " , [objectId])
    .then( (sql)=>{
      res.json({
        count: sql.rows[0].count,
        canLike: false
      });
    })
  })
});


app.listen(PORT, LOCALHOST, () => {
  console.log(`Starting /gamification on http://${LOCALHOST}:${PORT}`);
});

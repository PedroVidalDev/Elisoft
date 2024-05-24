import { headerAuth } from "./utils/header.js";
import request from "./utils/requestHttp.js";

const reqData = await request("vendas/fluxo", "GET", headerAuth, null);

console.log(reqData)
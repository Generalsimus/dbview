import { RouteModel } from "@/db/models/route"







const buildBacked = () => {
    const routes = RouteModel.findAll();
    console.log("🚀 --> buildBacked --> routes:", routes);

}
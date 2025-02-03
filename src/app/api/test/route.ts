import { dbConnect } from "@/lib/db.Connect";

export async function GET(){
    await dbConnect();
    return Response.json({message: "Hello World!"}, {status: 200})
}
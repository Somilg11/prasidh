import { dbConnect } from "@/lib/dbConnect";

export async function GET(){
    await dbConnect();
    return Response.json({message: "Hello World!"}, {status: 200})
}
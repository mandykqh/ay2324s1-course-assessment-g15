import axios from "axios";

const baseURL = (process.env.COLLABORATION_SERVICE_URL as string).toString();
const client = axios.create({ baseURL: baseURL });

export const getRoomID = async () => {
    try {
        const response = await client.get("/");
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
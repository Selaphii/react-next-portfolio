import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_API_URL) {
    throw new Error("MICROCMS_API_URL is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

// microCMSクライアントを作成
const client = createClient({
    serviceDomain: process.env.MICROCMS_API_URL,
    apiKey: process.env.MICROCMS_API_KEY,
});

// `thework` エンドポイントからデータを取得する関数
export const getThework = async (queries) => {
    try {
        const listData = await client.getList({
            endpoint: "thework",
            queries,
        });
        return listData;
    } catch (error) {
        console.error("microCMS fetch error:", error);
        throw error;
    }
};

import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
    token: process.env.SANITY_ACCESS_TOKEN,
    projectId,
    dataset,
    apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn:true
})
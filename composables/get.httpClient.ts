import type {FetchContext, FetchOptions, FetchResponse} from "ofetch";
import {type RuntimeConfig} from "nuxt/schema";

export const getHttpClient = <T>(url: string, options?: FetchOptions): any => {

    const config: RuntimeConfig = useRuntimeConfig()

    const queryOptions: any = {
        ...options,
        baseURL: config.public.baseUrl,
        key: url,
        server: false,
        retry: 1,
        retryStatusCodes: [401],
        retryDelay: 500,
        ignoreResponseErrors: true
    }

    return useFetch<T>(url, {
        ...queryOptions,

        onRequest({options}): void {
            options.headers = {
                "Authorization": `Bearer ${useCookie("accessToken").value}`
            }
        },
        async onResponseError({response}): Promise<void> {
            if (response.status === 401) {

                await $fetch(`/auth/refresh?token=${useCookie("refreshToken").value}`, {
                    method: "GET",
                    baseURL: process.env.NUXT_BASE_URL,
                    server: false,
                    onResponse(context: FetchContext & { response: FetchResponse<T> }): Promise<void> | void {
                        useCookie("accessToken").value = context.response._data.accessToken
                    }
                })
            }
        },
        headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`
        }
    });
}
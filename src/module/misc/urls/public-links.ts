import { API } from "@/configs/urls";

export const FindPublicLinkUrl = (code: string) => `${API}/public-links/${code}`
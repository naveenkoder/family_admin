import Method from "./method";

const apiFunctions = {
    loginApi: (payload) => Method.post("/admin/login", payload),
    logoutApi: () => Method.get("/admin/logout"),
    forgotPasswordApi: (payload) => Method.post("/admin/forgot", payload),
    changePasswordApi: (payload) => Method.post("/admin/changePassword", payload),
    resetPasswordLinkApi: (payload) => Method.post("/admin/link-status", payload),
    resetPasswordApi: (payload) => Method.post("/admin/reset-password", payload),
    userListApi: (payload) => Method.post("/admin/user/list", payload),
    userBlockApi: (payload) => Method.post(`/admin/user/block`, payload),
    dashboardApi: () => Method.get(`/admin/dashboard`),
    orderListApi: (payload) => Method.post(`admin/order/list`, payload),
    orderStatusUpdateApi: (payload) => Method.post(`admin/order/status`, payload),
    contentUpdateApi: (payload) => Method.put(`admin/content/edit`, payload),
    discountUpdateApi: (payload) => Method.put(`admin/discount/edit`, payload),
    homeUpdateApi: (payload) => Method.put(`admin/homepage/edit`, payload),
    getContentApi: () => Method.get(`admin/content/details`),
    getDiscountApi: () => Method.get(`admin/discount/details`),
    getHomeApi: () => Method.get(`admin/homepage/details`),
    testimonialListApi: (payload) => Method.post("admin/testimonial/list", payload),
    testimonialAddApi: (payload) => Method.post("admin/testimonial/add", payload),
    testimonialDeleteApi: (payload) => Method.delete("admin/testimonial/delete", payload),
    faqListApi: (payload) => Method.post("admin/faq/list", payload),
    faqAddApi: (payload) => Method.post("admin/faq/add", payload),
    faqDeleteApi: (payload) => Method.delete("admin/faq/delete", payload),
    orderDeleteApi: (payload) => Method.post("admin/order/delete", payload),

}

export default apiFunctions;
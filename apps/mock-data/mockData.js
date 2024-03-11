var Mock = require('mockjs')

const imgArr = {
    "MCSM": [
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_100898/20230828031855_QcD4y/jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMLwxm6Tlf3aip1y9I2-FekSarEwBxsRZkQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0s77iVsvwCAwQZteQypa5tm5JIxe5MVShiyMS9mqQPm-VypcuyMP7qSsXsCjjfEhGj3A&usqp=CAU",
        "https://static-cdn.nextapple.tw/prod/2023-06/955B8FCD73B2378111167A1FDA1C82A2/d3ffa3ce430978685eee33aaadd7e06a_1280.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDiWuoOT54ujIuV3_sazSrOF_Zsm6csrY3IDLIHw_Nppy-XOLQJ_fRIEOWSXjPMsWGc1M&usqp=CAU",
        "https://i3.momoshop.com.tw/1695046240/goodsimg/0011/721/565/11721565_R4_m.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NgMsD_aYG-kuCRzbDci8xLv4OxoMoLdvfg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb2qg7pVLBm-c-YCKJ1LvvCEkNtBzI4WXBBg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAMoZmYD-9lZdhRtyhu5ph5WIKEDufAtXag&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfcVGHKyCAz1OdEcwE4LEYF7LilXI6stdsQ&usqp=CAU",
    ],
    "MCP": [
        "https://cdn4.my.orstatic.com/userphoto/article/0/1K/000B3N9DD6EDAB401B1BBCj.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0oCMks17NcPnRHNynlFUwVUddPUOk5j7XHA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_9U1cLd1CeRWs8pmsbX3ULxHj2-MEVN-4Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHE8L1RNrQYgXETcOvgHBd_imk6KQQrfyz9Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIPRREHWEF2GDXRQDFtRIg3G5o5Iicm6elw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToSYB91ycxu3X0acirdoCxA-Al0pVAJ6zSNQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-l9g6pIz4sRwGxp2Awfdt2yj2fCQAkmwYCQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBWmsPfiNTvlEYfENCMfZoh7tmqHFUCwzJuA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71hurXvkNEgV9V_pFijjvEU-Dxcv9ujinIuWWnp7AZbSXQqdXkfB3PTEQWM_vmDj9trs&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhu_kGi3izjasz7zabVbbFsP0kTiV2UuWKhg&usqp=CAU",
    ],
    "MCSO": [
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_134754/20230927085425_MJuCO/jpg",
        "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2000,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/em9ermuqsqu9cwewxxwi/%E3%80%9076%E6%8A%98%E4%BC%98%E6%83%A0%E3%80%91%E5%B8%9D%E4%BA%AC%E9%85%92%E5%BA%97%E4%B8%8B%E5%8D%88%E8%8C%B6%EF%BD%9C%E7%8B%AE%E6%88%BF%E8%8F%9C%EF%BD%9C%E4%B8%8B%E5%8D%88%E8%8C%B6.jpg",
        "https://static.wixstatic.com/media/2c83ef_5d28d9f2a73c4b05897dd266a2ce0ac5~mv2.jpg/v1/fill/w_480,h_640,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2c83ef_5d28d9f2a73c4b05897dd266a2ce0ac5~mv2.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwEyv7cwLnkIPWhYpTVpBHj8ObSmYTOYCNfw&usqp=CAU",
        "https://www.foodnext.net/dispPageBox/getFile/GetImg.aspx?FileLocation=%2FPJ-FOODNEXT%2FFiles%2F&FileName=photo-08687-i.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPQm1aP_-ZcyLKUz3vThnSfJW-aCqoDS7rA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqSH1uar_cdQHBdpBniYFn7rzWDPbSGsHQg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLNnPDs7MfnCEul9sD8Tesqb_L6SOXrt2Og&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYybNc8OH8KJUMTs9DKfs6C_Ze1YIc_bIdHA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTjRerzks6sUgxCkWYiGHWITaKebF3S1wkbw&usqp=CAU",
    ],
    "MCBE": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbKg3ym4ex2ZNU_uHjUK_6NlHov_HAczcxwEzOpVSviGnhnaE9Kr7gSjBcj_NsbIWliw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63-amNVf92zkT92b7rTihsHzTUYCUfRWe03ZdwDM5bKos9gAKYYRAXMWoiddzs-1NmNU&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7XBfBC_Nl1ybgZC0CQbdhvMrHtVacVkSWwQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wrUlxU_u7_ztORxWXYyYYU7WrYP3e7Kdow&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVsRNlSsFukSz4Ulfjf6xnaDEZlXo0BrXB9g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOmfXJkxWgreCJYProOJ79WO8xyN6pVplazw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1YlI2FAHSbmHBg_gy2raBR7embCgm7HJfmw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNmhaEZVnzlzP-37sPjlBTCnmBHnT5HwLcmA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuz37giYQOyEy52K4mk--M-XwCvrUE2sarw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedYrdz2mEp9UEFSPXUHz8wN3avrLByNtOdQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOqP_fG4pURO36yMBumyi_qVCFbEUjEWZjhKYvJpepo1_NEsEG7iQX_5dLaPclGxOOvo&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJJpDZ62-KXt6kC-o4eeJNyVDZopKBf2eGA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9d3BMxyrTULjzJxTckuHPq8yWbqxUh62O5A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQG5M1pj0KGl46GdLFeJQDZQVX-4KIKOVgNg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS25dUeXcSQPKYEmJL_6t-xeMXf2CjsKuKpXQ&usqp=CAU",
    ],
    "MCS": [
        "https://www.baiyuemi.com/uploadfile/20220712/fdad0cb8500bd42d2117048da05075a3.jpg",
        "https://lh3.googleusercontent.com/proxy/opB8enTqs8EqDXoDRkK9cAceLxno3NUW_ergLMJhgvdCqgX7Rot2iy1iAdfj_qvdh4A-S41rbbhCw51pfADA6WFDx3Zi5ruRRlHngocOsgCXSZaYXrAGkp1awtb5zQgChpuN4hYbDX9x",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IMdxz4OgazzuCWDaslNfOvkDJmGxsG8npA&usqp=CAU",
        "https://www.foodnext.net/dispPageBox/getFile/GetImg.aspx?FileLocation=%2FPJ-FOODNEXT%2FFiles%2F&FileName=photo-05096-i.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYREpIe_M8KUMV7_65bvXNhK9wDDuQUnQCpQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYrlVsljH4iIgUG1lSC34XMgAychv6wlV7w&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSShUpKtCdq94UeUeLIDsgccQqal_NWmSebBA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPNIaRaYWjT1HNzFEqItaA6qtD4IAILz74Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8iTHaibB4u5vG86Kdn-dcJqnv-dyeQTj8jQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHtIForPcMC8oyy01FZXh5a5MU1cyHMJrOSA&usqp=CAU",
    ],
    "MCC": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSxZAJjAq7ApdvLzR9H0vDDZqIVqS0XWJgqg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahD4ohF0JRbylHLYEUtVNFmmGXGx56TQa7w&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_6YE_Kvg2Zc_J_cCMvwES2WYY4I3GGof5-Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIPRREHWEF2GDXRQDFtRIg3G5o5Iicm6elw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMptwFzk0Keep9KBKHKpcIeT3h5kTuN8Ry1Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwMbvF1ig0xK_LCdpmYBPZQSUhljk2zk1r_KXNL2pBX0gs7jFFpSURBZUrgJyN582Jmw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfyrV6dV7HN-QPH1klEdu66LgbHtY2w4zAJH0fNWXrfeRwEAMoXNPyVuTTvVNTBQ04TE&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTH5AeYoTK1wF2U8L8i8bPfmlfwaVxOFaczhHL4zfnJ3bRfAkgF4cloxUl935pAZF773I&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQspYBGN1uF57UAh7HFBmR6lEM1Xxxfjtv4iA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHt417DuDUfxEnUDo182wR5sMj58vyFNT-QUCWig8fcDvhObCFkKkF3QL2nUeiirlTzQ&usqp=CAU",
    ],
    "MCPZZ": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQoyVK8RFS3hZ1l3aGjvvPnyW_IdQSctBPA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa1VCA92iQEywYuWUZ5EW-g5dU5t2Auar0_A&usqp=CAU",
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg  ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6YMbV_8ljDXEEeOnRx1c-ei_sVIBhY26KSQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ6Gy5LVkcv9YaOFgExyh6cVHQGsCeqPEwCg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFx6CMcqaqC0SW9tn6sq0Ik9_rx0RKwI2eIg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmzEk2fgKBSAnETvkePoJtau2iQEAzats7mA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2L3iV6-qxYFkhZw9PxSLJKsqoyfvdzzeUyA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgifRz-6DoGcXzjWlGrlgg11ABnL2LEYGHw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSxAcqcsW_FyZg__jAOJuc6n3JTLkhj_-IA&usqp=CAU",
    ],
    "MCM": [
        "https://cdn.img.foodaily.com/images/articles/2022/07/19/QiY3SrnIMZ58b2jgXbqxuYfQYGLarOIqkDnx6yoQ.png",
        "https://pic3.zhimg.com/80/v2-808143807fd101ea6c67cda2df74ee22_1440w.webp",
        "https://p9.itc.cn/q_70/images03/20220818/70297a8b368541399c76bbab30f75689.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReLwtcWO4UAmQnPD8ym_cnoAYZ_0U_5L8r9g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReLwtcWO4UAmQnPD8ym_cnoAYZ_0U_5L8r9g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAn6Gz4c7v3TqHk-0d-2S_l1YQ4Q1O9-HaQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhAiVvXcoMzb8SABDFu2lHR9TWyrsmi8tvg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ldzm2y7ZlPtm2G7F8Qqm13LFFGbJ5PaqIA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7uu27WquwideG8LXJz_vgF_ZAWrNCExUJg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgYD_1XHRqCRrbLAwaO8ZjlRuB5SSvdg79PWGwG9PXpr4ohhLyi-uGRRizlLOT07AjF5Y&usqp=CAU",
    ],
    "MCIC": [
        "https://pic1.zhimg.com/v2-6155f081a5707937296082226e159841_720w.jpg?source=172ae18b",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn9gHCM9tb-UNJ5rRcElyKsGll_0qi4cecaw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08GkJSZL4RvFp6kYHaiJSAkxQVZrgB26YSg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoR8fmUQ-YxA1NzjTt7gnORbpxoEGlTJahPg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiK1UJsVCemllpmxb4knRc1a0Dah9G3thD0g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkVYK3RxOxW9dC64etgQ8wrfqxhv1J8X6BA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqHkhPG-bxi00j2HVh78FGcDZIy55kQ3cYqA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rgMHKTmT1g-RRkgzVin-5MTP4UcScYwX8A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUH0YqgLyPOvU7VFtng8p9NSW3wgLfIvc9Bw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvwElDwaGzSH-6vnyq3muFs_bQ19RVyzoAA&usqp=CAU",
    ],
    "MCSNX": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQj4web7wiCBWNP5ZnETpUjHCIeTfzAhrB8A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhPwz6_qyPLSicH6BgS3aRiXJSVeC-HK34ug&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHuxhNh7KRxqFdHXjDRlyp56iG_2Wj7I09g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoUuwrbzG76U6U4ut070yTh-Cdnbz_lcruvQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFdQaBHnZYnr1BzFb-3h1NzpWCrNxn8J4zQQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzLoOvit7xSRSBd_PIKB_x6DUPjeuEqGF-g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdLHjN_QunmWFm_o27hnkl9-6vf3Al95vBg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICu88Okiz4wXE2zQnQn6zUO8xM9UMUdtpHg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqznJZ3zgylSvB8OdS7ow_c3iiFGFtOk7qLD0rMNOCFpjW2xAZvh7BaY5Pnv7axpN0yEs&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aahUcGFkI37c7pvSUR44mzczf2BLSxGpRg&usqp=CAU",
    ],
    "MCB": [
        "https://img95.699pic.com/photo/60061/2324.jpg_wh860.jpg",
        "https://pic.52112.com/2020/01/06/JPG-200106_39/tpVxLypqpx_small.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTs0_wOe8tC1GEQS1OrVpkEi7iOpcF5bWRMw&usqp=CAU",
        "https://pic.52112.com/180705/JPG-180705_38/cHqJpAB1Sd_small.jpg",
        "https://pic.52112.com/180702/JPG-180702_252/g4l9HnoLXF_small.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThX5c6hSpo5lb5fUuzqGDKXorQHxXyIKIc1g&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFahMPY_09tvs9kN4O4CYXZQN9Xkpl9_f_jA&usqp=CAU",
        "https://pic.52112.com/2020/01/06/JPG-200106_39/S43NX6unUd_small.jpg",
        "https://pic.52112.com/2020/01/06/JPG-200106_39/SXbQX6rGKw_small.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77Ei5MXzBi51V4byLXy5FV2aFgcSrUI35G7VLSGzL89fDMnFoI0QyQLnaer52gMRYa4M&usqp=CAU",
        "https://img95.699pic.com/photo/60015/3796.jpg_wh300.jpg",
        "https://img95.699pic.com/photo/60015/3797.jpg_wh300.jpg",
        "https://img95.699pic.com/photo/60059/7527.jpg_wh300.jpg",
        "https://img95.699pic.com/photo/32004/1286.jpg_wh860.jpg",
        "https://pic.52112.com/180408/180408_63/pJ1EUeroCR_small.jpg",
    ]
};

const promotionsIMG = ["https://img.88icon.com/download/jpg/202106/a01b5a12f6c61f29e8d0a6aab1ad6dc3_800_270.jpg!bg", 
"https://img.ixintu.com/download/jpg/202004/a742d05be00db4069cf91ccad308254a_800_270.jpg!con", 
"https://extremeholiday.asia/wp-content/uploads/2022/01/%E5%9C%964.-%E5%85%A9%E6%AC%BE%E9%BA%B5%E9%A3%9F%E5%8D%B3%E6%97%A5%E8%B5%B7%E9%96%8B%E6%94%BE%E7%B7%9A%E4%B8%8A%E9%A0%90%E8%B3%BC%EF%BC%8C%E6%AF%8F%E7%B5%84598%E5%85%83%E5%90%AB%E5%85%A9%E7%9B%92%E9%BA%B5%E9%A3%9F%EF%BC%8C%E6%B0%91%E7%9C%BE%E5%8F%AF%E8%87%AA%E9%81%B8%E5%85%A9%E7%9B%92%E7%89%9B%E8%82%89%E9%BA%B5%EF%BC%8C%E6%88%96%E5%85%A9%E7%9B%92%E9%AE%91%E9%AD%9A%E9%9B%9E%E8%85%BF%E9%BA%B5%EF%BC%8C%E6%88%96%E4%B8%80%E7%9B%92%E7%89%9B%E8%82%89%E9%BA%B5%E6%B7%B7%E6%90%AD%E4%B8%80%E7%9B%92%E9%AE%91%E9%AD%9A%E9%9B%9E%E8%85%BF%E9%BA%B5%E3%80%82-1.jpg", 
"https://www.shutterstock.com/image-photo/delicious-loaves-bread-german-baker-600nw-1544878508.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKR9kP6rtcvhgBRKha4IDllqJfHM0BgLHspuATkKwEyNHgrZhy8gSrG6szfl6W2AtKtQ&usqp=CAU",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EgLVtlGCsd5ouOzTzYrYMbx-_5ySaYaTM2HpOsM5mcMDDdPDZbe2b1eow_yWlcO9Y54&usqp=CAU",
 "https://assets.gailsbread.co.uk/wp-content/uploads/2022/12/21110859/GEP75-1920x800.jpg",
"https://www.shutterstock.com/image-photo/chocolate-cake-berries-600nw-394680466.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWu7-cu0z5qEILvbOwuGfTkQFgfZy5Ef_92ATE8wFXBKFRuucmAAZRCnCaJ3yv1QHyvRw&usqp=CAU",
"https://hips.hearstapps.com/hmg-prod/images/%E7%84%A6%E7%B3%96%E8%B1%86%E4%B9%B3%E5%86%B0%E6%B7%87%E6%B7%8B%E5%8F%AF%E9%A0%8C%E9%AC%86%E9%A4%85-2-150-1-1662092238.jpg?crop=1xw:1xh;center,top&resize=980:*"];

const allergensMock = [
    {
        "description": { "zh": "甲壳类和甲壳类产品", "es": "Crustáceos y productos a base de crustáceos", "en": "Crustaceans and crustacean products" },
        "groupKey": "ALLERGENS",
        "icon": "CrustaceanIcon",
        "img": "",
        "key": "CRUSTACEANS",
        "name": { "zh": "甲壳类", "es": "Crustáceos", "en": "Crustaceans" }
    },
    {
        "description": { "zh": "鸡蛋及其衍生产品", "es": "Huevos y productos derivados", "en": "Eggs and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "EggsIcon",
        "img": "",
        "key": "EGGS",
        "name": { "zh": "鸡蛋", "es": "Huevos", "en": "Eggs" }
    },
    {
        "description": { "zh": "鱼和鱼制品", "es": "Pescado y productos a base de pescados", "en": "Fish and fish- based products" },
        "groupKey": "ALLERGENS",
        "icon": "FishIcon",
        "img": "",
        "key": "FISH",
        "name": { "zh": "鱼", "es": "Pescado", "en": "Fish" }
    },
    {
        "description": { "zh": "花生、花生制品和坚果", "es": "Cacahuetes, productos a base de cacahuetes y frutos secos", "en": "Peanuts, peanut - based products and nuts" },
        "groupKey": "ALLERGENS",
        "icon": "PeanutsIcon",
        "img": "",
        "key": "PEANUTS",
        "name": { "zh": "花生", "es": "Cacahuetes", "en": "Peanuts" }
    },
    {
        "description": { "zh": "大豆和大豆制品", "es": "Soja y productos a base de soja", "en": "Soy and soy - based products" },
        "groupKey": "ALLERGENS",
        "icon": "SoyIcon",
        "img": "",
        "key": "SOY",
        "name": { "zh": "大豆", "es": "Soja", "en": "Soy" }
    },
    {
        "description": { "zh": "牛奶及其衍生物（包括乳糖）", "es": "Leche y sus derivados(incluida la lactosa)", "en": "Milk and its derivatives(including lactose)" },
        "groupKey": "ALLERGENS",
        "icon": "LactoseIcon",
        "img": "",
        "key": "DAIRY",
        "name": { "zh": "奶制品", "es": "Lácteos", "en": "Dairy" }
    },
    {
        "description": { "zh": "坚果及其衍生产品", "es": "Frutos de cáscara y productos derivados", "en": "Nuts and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "NutsIcon",
        "img": "",
        "key": "NUTS",
        "name": { "zh": "坚果", "es": "Frutos con cáscara", "en": "Nuts" }
    },
    {
        "description": { "zh": "芹菜及其衍生产品", "es": "Apio y productos derivados", "en": "Celery and derived products" },
        "groupKey": "ALLERGENS",
        "icon": "CeleryIcon",
        "img": "",
        "key": "CELERY",
        "name": { "zh": "芹菜", "es": "Apio", "en": "Celery" }
    },
    {
        "description": { "zh": "芥末和芥末制品", "es": "Mostaza y productos a base de mostaza", "en": "Mustard and mustard - based products" },
        "groupKey": "ALLERGENS",
        "icon": "MustardIcon",
        "img": "",
        "key": "MUSTARD",
        "name": { "zh": "芥末", "es": "Mostaza", "en": "Mustard" }
    },
    {
        "description": { "zh": "芝麻粒或种子及芝麻制品", "es": "Granos o semillas de sésamo y productos a base de sésamo", "en": "Sesame grains or seeds and sesame - based products" },
        "groupKey": "ALLERGENS",
        "icon": "SesameIcon",
        "img": "",
        "key": "SESAME",
        "name": { "zh": "芝麻", "es": "Sésamo", "en": "Sesame" }
    },
    {
        "description": { "zh": "二氧化硫和亚硫酸盐", "es": "Dióxido de azufre y sulfitos", "en": "Sulfur dioxide and sulfites" },
        "groupKey": "ALLERGENS",
        "icon": "SO2Icon",
        "img": "",
        "key": "SULFITES",
        "name": { "zh": "亚硫酸盐", "es": "Sulfitos", "en": "Sulfites" }
    },
    {
        "description": { "zh": "羽扇豆和羽扇豆制品", "es": "Altramuces y productos a base de altramuces", "en": "Lupins and lupin - based products" },
        "groupKey": "ALLERGENS",
        "icon": "LupinIcon",
        "img": "",
        "key": "SULFITES",
        "name": { "zh": "羽扇豆", "es": "Altramuces", "en": "Lupins" }
    },
    {
        "description": { "zh": "软体动物和甲壳动物以及基于这些的产品", "es": "Moluscos y crustáceos y productos a base de estos", "en": "Molluscs and crustaceans and products based on these" },
        "groupKey": "ALLERGENS",
        "icon": "MolluscIcon",
        "img": "",
        "key": "MOLLUSKS",
        "name": { "zh": "软体动物", "es": "Moluscos", "en": "Mollusks" }
    },
];

const Random = (min, max, count) => {
    if (count === 0) {
        return [];
    }
    if (count < 0 || !count) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    const arr = [];
    do {
        for (let i = 0; i < (count - arr.length); i++) {
            let random = Random(min, max);
            if (arr.indexOf(random, 0) === -1) {
                arr.push(random);
            } else {
                break
            }
        }
    } while (arr.length != count);
    return arr;
}

const ingredientsMock = Mock.mock({
    "data|150-200": [{
        "icon": "",
        "id": "@id",
        "img": "",
        "price": "@float(1, 30, 2, 2)",
        "weight": "@natural(200, 1000)",
        "description": "@title(8,15)",
        "name": "@title(3)",
        "unit|1": [{
            "description": "Gramo",
            "groupKey": "UNIT",
            "icon": "",
            "img": "",
            "key": "GRAM",
            "name": "Gramo",
        },
        {
            "description": "Kilogramo",
            "groupKey": "UNIT",
            "icon": "",
            "img": "",
            "key": "KILOGRAM",
            "name": "Kilogramo"
        }],
    }]
});

const TagsMock = Mock.mock({
    "data|10-20": [{
        key: '@id',
        name: '@title(1)',
        description: '@title(5, 10)',
        icon: '',
        img: '',
        groupKey: 'TAGS',
    }]
});

const OptionGroupMock = Mock.mock({
    "data|10-20": [{
        key: '@id',
        name: '@title(2)',
        description: '@title(5, 10)',
        icon: '',
        img: '',
        "selectType|1": ['multi', 'single'],
        groupKey: '',
    }]
});

const OptionsMock = Mock.mock({
    "data|30-50": [{
        key: '@id',
        name: '@title(4)',
        description: '@title(5, 10)',
        "state|1": ['active', 'disabled'],
        extra: function () {
            const hasExtra = Random(0, 1) === 1;
            if (hasExtra) {
                return Mock.mock("@float(0, 1.5, 2, 2)");
            }
            return undefined;
        },
        icon: '',
        img: '',
        "groupKey|1": OptionGroupMock.data.map(({ key }) => key),
    }]
});

var dishes = Mock.mock({
    "data|150-200": [{
        "id": '@id',
        "categoryId": '@pick(["MCSM", "MCB", "MCP", "MCSO", "MCBE","MCS", "MCC","MCPZZ", "MCM","MCIC","MCSNX"])',
        "name": '@title()',
        "description": '@title(10, 20)',
        "disabled": "@boolean(3, 7, true)",
        "ingredients": function () {
            const indexes = Random(0, ingredientsMock.data.length - 1, Random(3, 8));
            return indexes.map((index) => ({ ...ingredientsMock.data[index] }));
        },
        "image": function () {
            const arr = imgArr[this.categoryId];
            return arr[Random(0, arr.length - 1)];
        },
        price: "@float(1, 50, 2, 2)",
        isTaxInclude: "@boolean(3, 7, true)",
        "taxRate|1": [0, 0.1, 0.2, 0.15],
        "tags": function () {
            const arr = Random(0, TagsMock.data.length - 1, Random(0, 5)) ?? [];
            return arr.map((index) => ({ ...TagsMock.data[index] }));
        },
        "allergens": function () {
            const arr = Random(0, allergensMock.length - 1, Random(0, 5)) ?? [];
            return arr.map((index) => ({ ...allergensMock[index], name: allergensMock[index].name.es, description: allergensMock[index].description.es }));
        },
        discount: function () {
            const price = this.price;
            const random = Random(0, 1);
            if (random === 1) {
                const mock = Mock.mock({
                    "discountType|1": ["percentage", "money"],
                    discountValue: function () {
                        if (this.discountType === 'percentage') {
                            return Mock.mock("@float(0, 0.9, 2, 2)");
                        }
                        return Mock.mock(`@float(1, ${price}, 2,2)`);
                    },
                    "discountLimitType|1": ["money", "quantity", "combo"],
                    "discountLimitValue": function () {
                        switch (this.discountLimitType) {
                            case 'money':
                                return Mock.mock({
                                    "number": `@float(${[price]}, ${price * 3}, 2,2)`
                                }).number;
                            case 'combo':
                                return 0;
                            default: return Mock.mock({
                                "number|1-20": 20
                            }).number;
                        }
                    },
                    name: "@title(3)",
                    description: "@title(5, 8)",
                    id: "@id",
                });
                return mock;
            }
            return undefined;
        },
        options: function () {
            const randomArr = Random(0, OptionGroupMock.data.length - 1, Random(0, 5)) ?? [];
            const arr = randomArr.map((index) => ({
                ...OptionGroupMock.data[index],
                children: OptionsMock.data.filter(({ groupKey }) => groupKey === OptionGroupMock.data[index].key),
            }));
            return arr;
        }
    }]
});

const promotionsMock = Mock.mock({
    "data|80-120": [{
        id: "@id",
        name: '@title(5, 10)',
        "img|1":promotionsIMG,
        targetDishes: function () {

            const index = Random(0, dishes.data.length - 1);
            return {
                id: dishes.data[index].id,
                name: dishes.data[index].name,
                price: dishes.data[index].price
            };
        },
        "discountType|1": ["percentage", "money"],
        discountValue: function () {
            if (this.discountType === 'percentage') {
                return Mock.mock("@float(0, 0.9, 2, 2)");
            }
            return Mock.mock(`@float(1, ${this.targetDishes.price}, 2,2)`);
        },
        "discountLimitType|1": ["money", "quantity", "combo"],
        "discountLimitValue": function () {
            switch (this.discountLimitType) {
                case 'money':
                    return Mock.mock({
                        "number": `@float(${[this.targetDishes.price]}, ${this.targetDishes.price * 3}, 2,2)`
                    }).number;
                case 'combo':
                    return 0;
                default: return Mock.mock({
                    "number|1-20": 20
                }).number;
            }
        },
        startAt: new Date("2023-12-5"),
        endAt: new Date("2024-2-10"),

    }]

});

const { writeFile } = require('fs');

const path = './data.mock.json';

const data = {
    dishes,
    promotions:promotionsMock,
    tags: TagsMock,
    options: OptionsMock,
    OptionGroupMock: OptionGroupMock,
    ingredientsMock: ingredientsMock
}

writeFile(path, JSON.stringify(data, null, 4), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});



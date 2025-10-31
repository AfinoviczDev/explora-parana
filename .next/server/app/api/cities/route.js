"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/cities/route";
exports.ids = ["app/api/cities/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcities%2Froute&page=%2Fapi%2Fcities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcities%2Froute.ts&appDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcities%2Froute&page=%2Fapi%2Fcities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcities%2Froute.ts&appDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_parana_em_foto_starter_parana_em_foto_app_api_cities_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cities/route.ts */ \"(rsc)/./app/api/cities/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cities/route\",\n        pathname: \"/api/cities\",\n        filename: \"route\",\n        bundlePath: \"app/api/cities/route\"\n    },\n    resolvedPagePath: \"D:\\\\parana-em-foto-starter\\\\parana-em-foto\\\\app\\\\api\\\\cities\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_parana_em_foto_starter_parana_em_foto_app_api_cities_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/cities/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaXRpZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNpdGllcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNpdGllcyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDcGFyYW5hLWVtLWZvdG8tc3RhcnRlciU1Q3BhcmFuYS1lbS1mb3RvJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDcGFyYW5hLWVtLWZvdG8tc3RhcnRlciU1Q3BhcmFuYS1lbS1mb3RvJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFuYS1lbS1mb3RvLz9kNDY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXHBhcmFuYS1lbS1mb3RvLXN0YXJ0ZXJcXFxccGFyYW5hLWVtLWZvdG9cXFxcYXBwXFxcXGFwaVxcXFxjaXRpZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NpdGllcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NpdGllc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2l0aWVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxccGFyYW5hLWVtLWZvdG8tc3RhcnRlclxcXFxwYXJhbmEtZW0tZm90b1xcXFxhcHBcXFxcYXBpXFxcXGNpdGllc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2l0aWVzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcities%2Froute&page=%2Fapi%2Fcities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcities%2Froute.ts&appDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/cities/route.ts":
/*!*********************************!*\
  !*** ./app/api/cities/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n\n\nfunction checkAuth(req) {\n    const token = req.headers.get(\"x-admin-token\");\n    const expected = process.env.ADMIN_TOKEN;\n    return token && expected && token === expected;\n}\nasync function GET() {\n    const supabase = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n    const { data, error } = await supabase.from(\"cities\").select(\"*\").order(\"name\", {\n        ascending: true\n    });\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 500\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\nasync function POST(req) {\n    if (!checkAuth(req)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const body = await req.json();\n    const supabase = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n    const { data, error } = await supabase.from(\"cities\").insert([\n        body\n    ]).select().single();\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 400\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\nasync function DELETE(req) {\n    if (!checkAuth(req)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const { searchParams } = new URL(req.url);\n    const id = searchParams.get(\"id\");\n    if (!id) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"ID required\"\n    }, {\n        status: 400\n    });\n    const supabase = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n    const { error } = await supabase.from(\"cities\").delete().eq(\"id\", id);\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 400\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NpdGllcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF1RDtBQUNEO0FBRXRELFNBQVNFLFVBQVVDLEdBQWdCO0lBQ2pDLE1BQU1DLFFBQVFELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQzlCLE1BQU1DLFdBQVdDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztJQUN4QyxPQUFPTixTQUFTRyxZQUFZSCxVQUFVRztBQUN4QztBQUVPLGVBQWVJO0lBQ3BCLE1BQU1DLFdBQVdYLG9FQUFnQkE7SUFDakMsTUFBTSxFQUFFWSxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1GLFNBQVNHLElBQUksQ0FBQyxVQUFVQyxNQUFNLENBQUMsS0FBS0MsS0FBSyxDQUFDLFFBQU87UUFBQ0MsV0FBVTtJQUFJO0lBQzlGLElBQUlKLE9BQU8sT0FBT2QscURBQVlBLENBQUNtQixJQUFJLENBQUM7UUFBRUwsT0FBT0EsTUFBTU0sT0FBTztJQUFDLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQzVFLE9BQU9yQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQ047QUFDM0I7QUFFTyxlQUFlUyxLQUFLbkIsR0FBZ0I7SUFDekMsSUFBSSxDQUFDRCxVQUFVQyxNQUFNLE9BQU9ILHFEQUFZQSxDQUFDbUIsSUFBSSxDQUFDO1FBQUVMLE9BQU87SUFBZSxHQUFHO1FBQUVPLFFBQVE7SUFBSTtJQUN2RixNQUFNRSxPQUFPLE1BQU1wQixJQUFJZ0IsSUFBSTtJQUMzQixNQUFNUCxXQUFXWCxvRUFBZ0JBO0lBQ2pDLE1BQU0sRUFBRVksSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNRixTQUFTRyxJQUFJLENBQUMsVUFBVVMsTUFBTSxDQUFDO1FBQUNEO0tBQUssRUFBRVAsTUFBTSxHQUFHUyxNQUFNO0lBQ3BGLElBQUlYLE9BQU8sT0FBT2QscURBQVlBLENBQUNtQixJQUFJLENBQUM7UUFBRUwsT0FBT0EsTUFBTU0sT0FBTztJQUFDLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQzVFLE9BQU9yQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQ047QUFDM0I7QUFFTyxlQUFlYSxPQUFPdkIsR0FBZ0I7SUFDM0MsSUFBSSxDQUFDRCxVQUFVQyxNQUFNO1FBQ25CLE9BQU9ILHFEQUFZQSxDQUFDbUIsSUFBSSxDQUFDO1lBQUVMLE9BQU87UUFBZSxHQUFHO1lBQUVPLFFBQVE7UUFBSTtJQUNwRTtJQUNBLE1BQU0sRUFBRU0sWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSXpCLElBQUkwQixHQUFHO0lBQ3hDLE1BQU1DLEtBQUtILGFBQWFyQixHQUFHLENBQUM7SUFDNUIsSUFBSSxDQUFDd0IsSUFBSSxPQUFPOUIscURBQVlBLENBQUNtQixJQUFJLENBQUM7UUFBRUwsT0FBTztJQUFjLEdBQUc7UUFBRU8sUUFBUTtJQUFJO0lBRTFFLE1BQU1ULFdBQVdYLG9FQUFnQkE7SUFDakMsTUFBTSxFQUFFYSxLQUFLLEVBQUUsR0FBRyxNQUFNRixTQUFTRyxJQUFJLENBQUMsVUFBVWdCLE1BQU0sR0FBR0MsRUFBRSxDQUFDLE1BQU1GO0lBQ2xFLElBQUloQixPQUFPLE9BQU9kLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUFDO1FBQUVMLE9BQU9BLE1BQU1NLE9BQU87SUFBQyxHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUM1RSxPQUFPckIscURBQVlBLENBQUNtQixJQUFJLENBQUM7UUFBRWMsU0FBUztJQUFLO0FBQzNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFyYW5hLWVtLWZvdG8vLi9hcHAvYXBpL2NpdGllcy9yb3V0ZS50cz81MDkxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHsgZ2V0U3VwYWJhc2VBZG1pbiB9IGZyb20gJ0AvbGliL3N1cGFiYXNlQWRtaW4nXHJcblxyXG5mdW5jdGlvbiBjaGVja0F1dGgocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcnMuZ2V0KCd4LWFkbWluLXRva2VuJylcclxuICBjb25zdCBleHBlY3RlZCA9IHByb2Nlc3MuZW52LkFETUlOX1RPS0VOXHJcbiAgcmV0dXJuIHRva2VuICYmIGV4cGVjdGVkICYmIHRva2VuID09PSBleHBlY3RlZFxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIGNvbnN0IHN1cGFiYXNlID0gZ2V0U3VwYWJhc2VBZG1pbigpXHJcbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgnY2l0aWVzJykuc2VsZWN0KCcqJykub3JkZXIoJ25hbWUnLHthc2NlbmRpbmc6dHJ1ZX0pXHJcbiAgaWYgKGVycm9yKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICBpZiAoIWNoZWNrQXV0aChyZXEpKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpXHJcbiAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZUFkbWluKClcclxuICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdjaXRpZXMnKS5pbnNlcnQoW2JvZHldKS5zZWxlY3QoKS5zaW5nbGUoKVxyXG4gIGlmIChlcnJvcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcTogTmV4dFJlcXVlc3QpIHtcclxuICBpZiAoIWNoZWNrQXV0aChyZXEpKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gIH1cclxuICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXEudXJsKVxyXG4gIGNvbnN0IGlkID0gc2VhcmNoUGFyYW1zLmdldCgnaWQnKVxyXG4gIGlmICghaWQpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSUQgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuXHJcbiAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZUFkbWluKClcclxuICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKCdjaXRpZXMnKS5kZWxldGUoKS5lcSgnaWQnLCBpZClcclxuICBpZiAoZXJyb3IpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pXHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U3VwYWJhc2VBZG1pbiIsImNoZWNrQXV0aCIsInJlcSIsInRva2VuIiwiaGVhZGVycyIsImdldCIsImV4cGVjdGVkIiwicHJvY2VzcyIsImVudiIsIkFETUlOX1RPS0VOIiwiR0VUIiwic3VwYWJhc2UiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJqc29uIiwibWVzc2FnZSIsInN0YXR1cyIsIlBPU1QiLCJib2R5IiwiaW5zZXJ0Iiwic2luZ2xlIiwiREVMRVRFIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiaWQiLCJkZWxldGUiLCJlcSIsInN1Y2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cities/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nfunction getSupabaseAdmin() {\n    const url = \"https://wfopurfjnpagbbuomwyb.supabase.co\";\n    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;\n    if (!url || !key) {\n        throw new Error(\"Supabase admin env vars ausentes\");\n    }\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(url, key);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFvRDtBQUU3QyxTQUFTQztJQUNkLE1BQU1DLE1BQU1DLDBDQUFvQztJQUNoRCxNQUFNRyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtJQUNqRCxJQUFJLENBQUNMLE9BQU8sQ0FBQ0ksS0FBSztRQUNoQixNQUFNLElBQUlFLE1BQU07SUFDbEI7SUFDQSxPQUFPUixtRUFBWUEsQ0FBQ0UsS0FBS0k7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhbmEtZW0tZm90by8uL2xpYi9zdXBhYmFzZUFkbWluLnRzPzA5ZDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwYWJhc2VBZG1pbigpIHtcbiAgY29uc3QgdXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIVxuICBjb25zdCBrZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuICBpZiAoIXVybCB8fCAha2V5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdXBhYmFzZSBhZG1pbiBlbnYgdmFycyBhdXNlbnRlcycpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNsaWVudCh1cmwsIGtleSlcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJnZXRTdXBhYmFzZUFkbWluIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsImtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcities%2Froute&page=%2Fapi%2Fcities%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcities%2Froute.ts&appDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cparana-em-foto-starter%5Cparana-em-foto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
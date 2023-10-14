"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { Op } = require("sequelize");
const router = express_1.default.Router();
const models_1 = __importDefault(require("../models"));
// 각각 req, res, next express에서 가저온 타입 넣어주기
router.get("/list", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const data = req.query.data;
        const mainSort = data.mainSort || "";
        const search = data.search || "";
        const time = ((_a = data.detailSort) === null || _a === void 0 ? void 0 : _a.time) || "";
        const view = ((_b = data.detailSort) === null || _b === void 0 ? void 0 : _b.view) || "";
        const like = ((_c = data.detailSort) === null || _c === void 0 ? void 0 : _c.like) || "";
        const whereCondition = {};
        let orderCondition = [["createdAt", "DESC"]];
        // 큰틀의 정렬 값 where절에 넣기
        if (mainSort && mainSort !== "전체") {
            whereCondition.category = mainSort;
        }
        // 검색어가 있을 경우 where절에 입력값넣기
        if (search) {
            // $or 연산자를 사용하여 title 또는 content 중 하나에 포함된 경우를 검사
            whereCondition[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } },
            ];
        }
        //디테일 정렬 버튼 값을 가져와서 order값에 넣고 정렬
        if (time === "newset") {
            orderCondition = [["createdAt", "DESC"]];
        }
        else if (time === "latest") {
            orderCondition = "";
        }
        const getCommunityPosts = yield models_1.default.community.findAll({
            where: whereCondition,
            order: orderCondition,
        });
        res.status(200).json(getCommunityPosts);
    }
    catch (e) {
        res.status(500).json(e);
        next(e);
    }
}));
router.post("/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, title, detail, content } = req.body.form;
    try {
        const newCommunityPost = yield models_1.default.community.create({
            category,
            detail,
            title,
            content,
        });
        res.status(200).json({
            message: "성공적으로 저장되었습니다.",
            data: newCommunityPost,
        });
    }
    catch (e) {
        res.status(500).json(e);
        console.log(e);
        next(e);
    }
}));
exports.default = router;
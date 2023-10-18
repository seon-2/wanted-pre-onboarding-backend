const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

// prisma client 사용 선언
const client = new PrismaClient();

// 1. 채용공고 등록
router.post("/register", async (req, res) => {
  try {
    const { cId, position, reward, techSkill } = req.body;

    // 회사ID 비어있을 때 예외처리
    if (!cId) {
      return res
        .status(400)
        .json({ ok: false, error: "회사 ID를 입력하세요." });
    }
    // 빈 입력 예외처리
    if (!position || !reward || !techSkill) {
      return res
        .status(400)
        .json({ ok: false, error: "빈칸을 모두 입력하세요." });
    }
    // 회사 조회
    const company = await client.company.findUnique({
      where: {
        id: parseInt(cId),
      },
    });
    // 없는 회사인지 확인
    if (!company) {
      return res
        .status(400)
        .json({ ok: false, error: "존재하지 않는 회사입니다." });
    }

    // 등록
    const newRecruitment = await client.recruitment.create({
      data: {
        cId: company.id,
        position,
        reward,
        techSkill,
      },
    });

    res.json({ ok: true, todo: newRecruitment });
  } catch (error) {
    console.error(error);
  }
});

// 2. 채용공고 수정
router.put("/update/:rId", async (req, res) => {
  try {
    const { rId } = req.params;
    const { newPosition, newReward, newTechSkill } = req.body;

    // id를 통해 채용공고가 존재하는지 확인
    const existRecruitment = await client.recruitment.findUnique({
      where: {
        id: parseInt(rId),
      },
    });

    // 채용공고가 존재하지 않을 때 예외처리
    if (!existRecruitment) {
      return res
        .status(400)
        .json({ ok: false, error: "존재하지 않는 채용공고입니다." });
    }

    // 빈 입력 예외처리
    if (!newPosition || !newReward || !newTechSkill) {
      return res
        .status(400)
        .json({ ok: false, error: "빈칸을 모두 입력하세요." });
    }

    // 수정
    const updatedRecruitment = await client.recruitment.update({
      // 조회
      where: {
        id: parseInt(rId),
      },
      // 수정
      data: {
        position: newPosition,
        reward: newReward,
        techSkill: newTechSkill,
      },
    });

    res.json({ ok: true, updatedRecruitment });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

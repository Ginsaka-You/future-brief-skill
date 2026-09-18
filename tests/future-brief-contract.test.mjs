import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const skill = readFileSync(resolve(here, "../SKILL.md"), "utf8");
const openai = readFileSync(resolve(here, "../agents/openai.yaml"), "utf8");

test("future-brief is explicit-only and hands control back to the user", () => {
  assert.match(skill, /只在用户显式调用[^\n]+时运行/);
  assert.match(openai, /allow_implicit_invocation: false/);
  assert.match(skill, /手动调用[^\n]*\$future-clinic/);
  assert.match(skill, /不得自动触发[^\n]*\$future-clinic/);
});

test("researchable facts are checked before route-changing user unknowns are asked", () => {
  assert.match(skill, /能查[^\n]*先查/);
  assert.match(skill, /只询问[^\n]*用户[^\n]*(?:安全性|问题模型|第一步行动|主要路线)/);
  assert.match(skill, /合并当前必要问题/);
  assert.match(skill, /不做固定问题数/);
  assert.match(skill, /用户回答后[^\n]*同一份[^\n]*Future Brief/);
});

test("readiness is safe conditionalization rather than complete knowledge", () => {
  assert.match(skill, /就绪不表示所有信息都已知道/);
  assert.match(skill, /剩余未知能够安全条件化/);
  assert.match(skill, /虚假事实/);
  assert.match(skill, /错误目标/);
  assert.match(skill, /未经确认的用户偏好/);
  assert.match(skill, /Future Brief/);
});

test("the Brief uses one semantic non-overwriting Markdown name everywhere", () => {
  assert.match(skill, /用户明确指定 Brief 名称时优先使用/);
  assert.match(skill, /<核心主题>_前置确认_<YYYY-MM-DD>\.md/);
  assert.match(skill, /[\\/:*?"<>|]/);
  assert.match(skill, /_2[^\n]*_3/);
  assert.match(skill, /不得覆盖旧 Brief/);
  assert.match(skill, /Markdown 一级标题[^\n]*实际文件名/);
  assert.match(skill, /聊天链接[^\n]*实际文件名/);
  assert.match(skill, /Future Clinic[^\n]*路径[^\n]*实际文件名/);
  assert.match(skill, /不新增命名解析器[^\n]*脚本[^\n]*状态[^\n]*manifest/);
  assert.doesNotMatch(skill, /默认文件名为\s*`?(?:future-brief|Future Brief|brief|output)\.md`?/);
});

test("the natural brief preserves evidence categories without becoming Future Clinic", () => {
  for (const label of [
    "已验证事实",
    "用户观察",
    "用户偏好",
    "模型假设",
    "预测",
    "未知",
  ]) {
    assert.match(skill, new RegExp(label));
  }
  assert.match(skill, /不负责生成候选路线/);
  assert.match(skill, /不负责生成推荐/);
  assert.match(skill, /不负责生成 PDF/);
  assert.match(skill, /不创建或调用 Agent/);
});

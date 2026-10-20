import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const skill = readFileSync(resolve(here, "../SKILL.md"), "utf8");
const openai = readFileSync(resolve(here, "../agents/openai.yaml"), "utf8");

// Static packaging/contract guards only. Behavioral evidence is reviewed separately.
test("explicit-only metadata and manual Clinic handoff remain", () => {
  assert.match(skill, /只在用户显式调用[^\n]+时运行/);
  assert.match(openai, /allow_implicit_invocation: false/);
  assert.match(openai, /default_prompt: "[^\n]*\$future-brief/);
  assert.match(skill, /手动调用[^\n]*\$future-clinic/);
  assert.match(skill, /不得自动触发[^\n]*\$future-clinic/);
});

test("alignment replaces route-only conditionalization in the instructions", () => {
  assert.match(skill, /研究对象/);
  assert.match(skill, /成功标准/);
  assert.match(skill, /不能仅因可以条件化/);
  assert.match(skill, /用户回答后/);
  assert.doesNotMatch(skill, /且不能安全条件化的信息|剩余未知能够安全条件化/);
  assert.doesNotMatch(openai, /only route-changing|short Future Brief/);
});

test("chat and Markdown have an explicit shared-body contract", () => {
  assert.match(skill, /聊天交付完整、可独立理解/);
  assert.match(skill, /Markdown 留存同一正文/);
  assert.match(skill, /附件不得暗藏/);
});

test("semantic filenames preserve history", () => {
  assert.match(skill, /用户明确指定 Brief 名称时优先使用/);
  assert.match(skill, /<核心主题>_前置确认_<YYYY-MM-DD>\.md/);
  assert.match(skill, /_2[^\n]*_3/);
  assert.match(skill, /不得覆盖旧 Brief/);
  assert.match(skill, /Markdown 一级标题[^\n]*实际文件名/);
  assert.match(skill, /不新增命名解析器[^\n]*脚本[^\n]*状态[^\n]*manifest/);
});

test("evidence categories and Brief scope remain explicit", () => {
  for (const label of ["已验证事实", "用户观察", "用户偏好", "模型假设", "预测", "未知"]) {
    assert.ok(skill.includes(label));
  }
  assert.match(skill, /不负责生成 PDF/);
  // Temporary Agent collaboration is allowed; this guard must not restore the retired ban.
  assert.match(skill, /解决方案候选/);
});

# Future Brief

在深入研究之前，让用户看见任务被怎样理解，澄清会改变研究的歧义。

Future Brief 是前置需求对齐 Skill：从产物或手段追到希望实现的结果，用动词说明需要完成的作用，再在聊天展示当前理解。复用已有答案，针对尚未解决的目标、范围、成功标准或重要取舍自然追问。回答会实际改变正文；任务已经明确就直接交付，不固定问题数或确认轮次。

有价值时可提出更高一层的目标，但用户已确认目标与模型新建议分别表达；未被采纳的建议不进入必做范围，也不阻断原已明确任务。指定产物或创作题无需一律拔高。

它允许比较不同任务解释，但不生成解决方案候选、推荐或 PDF，不自动进入下一阶段，也不要求为了体现问诊而强行提问。

## 使用

下载本仓库，或克隆为名为 `future-brief` 的文件夹：

```sh
git clone https://github.com/Ginsaka-You/future-brief-skill.git future-brief
```

将这个文件夹放到所用宿主支持的 Skill 目录，按宿主方式加载。入口为根目录的 `SKILL.md`；`agents/openai.yaml` 包含 Codex 的显示信息与显式调用设置。这里提供的是 Skill 仓库，不是已经上架的 ChatGPT 插件，跨宿主的发现、调用和工具权限需分别验证。

在支持相应语法的宿主中显式调用：

```text
$future-brief 我想改进一个小型读书活动。请先整理目标、已知事实、
限制和必须确认的问题，不要现在替我选择方案。
```

Brief 就绪后，由用户检查并手动调用 [Future Clinic](https://github.com/Ginsaka-You/future-clinic-skill) 做深入研究；不会自动调用。

## 交付与边界

- 在聊天交付完整、可独立理解的 Brief，以主题命名的 Markdown 留存同一正文；来源附件不能隐藏改变研究方向的要求。
- 保留指定候选及其逐项验证责任，区分事实、观察、偏好、假设与未知。
- 不覆盖旧 Brief，不把上一轮报告当成本轮完成。
- 不需要渲染脚本或 Python 依赖；事实核查和文件交付使用宿主提供的能力。
- Brief 是研究输入，不是外部事实或某种方案有效性的证明。
- 不授权现实操作、发送消息或后台任务。

## 检查

```sh
node --test tests/*.test.mjs
```

这些测试只检查指令约束，不证明实际问诊质量。行为验收方法见 [可见需求对齐验收](tests/visible-alignment.acceptance.md) 和 [任务表达与更高目标验收](tests/task-construction.acceptance.md)，合成原始输入位于 tests/fixtures/visible-alignment.json；不要把评判标准交给被测模型。仓库不包含真实业务对话或历史运行记录。

本次方法修订参考 Felix Rieseberg 的[作者原文](https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/)，适配范围与实际检查状态见 [变更记录 Comments](CHANGELOG.md)。

## 许可

本仓库尚未另附开源许可证。

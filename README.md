# Future Brief

在深入研究之前，把目标、事实边界和真正需要用户确认的问题整理清楚。

Future Brief 是轻量前置确认 Skill：复用已有上下文，先查能查的信息，只问会实质改变研究方向的用户未知，最后交付一份短小、自然语言的 Markdown Brief。

它不生成候选路线、推荐或 PDF，不自动进入下一阶段，也不要求为了体现问诊而强行提问。

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

- 交付以主题命名的 Markdown Brief，区分事实、观察、偏好、假设与未知。
- 不覆盖旧 Brief，不把上一轮报告当成本轮完成。
- 不需要渲染脚本或 Python 依赖；事实核查和文件交付使用宿主提供的能力。
- Brief 是研究输入，不是外部事实或某种方案有效性的证明。
- 不授权现实操作、发送消息或后台任务。

## 检查

```sh
node --test tests/*.test.mjs
```

这些测试只检查指令约束，不证明实际问诊质量。仓库不包含真实业务对话或历史运行记录。

## 许可

本仓库尚未另附开源许可证。

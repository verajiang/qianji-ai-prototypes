# LiveAgent 改造版·三张关键稿

本原型以 `docs/LiveAgent改造版-工作台功能交互与运转流程-v1.0.md` 第 5.2 节为基线，展示：

1. 启动/选择专家；
2. 问数执行中；
3. 业务结论、导出数据与一键反馈。

## 可演示交互

- 点击“问数专家”进入该专家的直接提问页，点击最近会话进入对应结果，点击“新对话”返回空白对话；
- 打开“使用记录”，按专家查看多个独立对话，并点击任一记录查看、继续该对话；
- 从启动页直接发起问数，不预设常用范围；
- 查看简明执行步骤，并按需展开“查询详情/数据依据”；
- 从答案导出明细/汇总 XLSX 或 CSV，选择字段和本地保存位置；
- 提交“有问题？”反馈；
- 打开全页面“Skills Hub”，通过搜索和分类浏览管理员已发布的 Skill，选择安装后在“我的 Skills”中使用；
- 打开全页面“我的 Skills”，查看已安装的 Skill，以及自己创建的私有草稿和待审核版本；
- 打开“专家中心”，查看组织提供的专家；已添加的“问数专家”位于左侧“我的专家”下。

## 预览

直接用浏览器打开 `index.html`，或在本目录启动任意静态文件服务。

异常状态通过 URL 参数演示，不出现在业务界面：`?frame=2&state=loading`、`?frame=2&state=error`、`?frame=3&state=offline`。

## 三张交付图

- `../output/playwright/关键稿1-启动与选能力.png`
- `../output/playwright/关键稿2-问数执行.png`
- `../output/playwright/关键稿3-结果与操作.png`

## 补充全页面稿

- `../output/playwright/专家中心-全页面.png`
- `../output/playwright/SkillsHub-全页面.png`

## 设计系统

- Token：`../prototype/assets/qianji-tokens.css`
- 项目级组件契约：`../prototype/component-contracts.md`
- 主规格：1440px，并适配 1280px 和窄窗口。

## 验收结果

- JavaScript 语法检查通过；
- 千机 HTML 校验：0 error / 0 warning；
- Playwright 浏览器控制台：0 error / 0 warning；
- 1440×900 三张主稿、1280×800 和 760×900 均已实机检查；
- 1280 和 760 视口均无页面级横向溢出；
- 已验证“新对话 → 问数执行 → 最近会话结果”和“使用记录 → 历史对话 → 继续提问”的自然流转、查询依据展开/收起、反馈、本地导出、全页面 Skills Hub 安装与专家中心。

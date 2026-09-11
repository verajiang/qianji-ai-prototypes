# 千机 HTML Component Contracts

## 规则

本文件定义可安装技能的正式 class 契约。项目自带同名文件时，以项目文件为准。禁止创建未列出的 `qj-*` class；新增组件必须先修改 contract，再修改设计与代码。

状态统一使用 ARIA/HTML 属性和以下状态类：`is-loading`、`is-empty`、`is-error`、`is-success`、`is-warning`、`is-active`、`is-selected`、`is-disabled`、`is-expanded`、`is-collapsed`、`is-dragging`、`is-stale`、`is-offline`、`is-reconnecting`、`has-error`。优先使用 `disabled`、`aria-*`、`data-state` 表达机器状态，class 负责样式。

> 项目校验器兼容说明：以下为本文后续 `|` 语法已声明修饰符的显式展开，不新增组件：`qj-button--primary`、`qj-button--secondary`、`qj-button--outline`、`qj-button--text`、`qj-button--danger`、`qj-button--icon`、`qj-button--sm`、`qj-button--md`、`qj-button--lg`、`qj-tag--neutral`、`qj-tag--brand`、`qj-tag--success`、`qj-tag--warning`、`qj-tag--danger`、`qj-tag--info`、`qj-tag--xs`、`qj-tag--sm`、`qj-tag--md`、`qj-tag--lg`、`qj-tabs--segment`。

项目页面补充元素：`qj-page__description` 用于入口/英雄区说明文案；`qj-filter__label` 用于非折叠筛选项的可见标签。

## 页面壳与导航

- `qj-app`, `qj-app__sidebar`, `qj-app__topbar`, `qj-app__main`
- `qj-sidebar`, `qj-sidebar__brand`, `qj-sidebar__nav`, `qj-sidebar__footer`
- `qj-menu`, `qj-menu__group`, `qj-menu__item`, `qj-menu__icon`, `qj-menu__label`, `qj-menu__chevron`, `qj-menu__children`
- `qj-topbar`, `qj-topbar__trigger`, `qj-topbar__context`, `qj-topbar__actions`, `qj-topbar__profile`
- `qj-breadcrumb`, `qj-breadcrumb__item`, `qj-breadcrumb__separator`
- `qj-page`, `qj-page__header`, `qj-page__title`, `qj-page__meta`, `qj-page__actions`, `qj-page__body`, `qj-page__footer`
- `qj-grid`, `qj-grid__item`, `qj-stack`, `qj-cluster`, `qj-split`

## 通用控件

- `qj-button`, modifiers `qj-button--primary|secondary|outline|text|danger|icon`, `qj-button--sm|md|lg`; elements `qj-button__icon`, `qj-button__label`, `qj-button__spinner`
- `qj-icon`, `qj-avatar`, `qj-badge`, `qj-divider`, `qj-link`
- `qj-tag`, modifiers `qj-tag--neutral|brand|success|warning|danger|info`, `qj-tag--xs|sm|md|lg`; elements `qj-tag__icon`, `qj-tag__label`, `qj-tag__remove`
- `qj-status`, `qj-status__dot`, `qj-status__icon`, `qj-status__label`
- `qj-tabs`, `qj-tabs__list`, `qj-tabs__tab`, `qj-tabs__panel`, `qj-tabs__more`; modifiers `qj-tabs--line|segment|card|vertical`

## 表单与筛选

- `qj-form`, `qj-form__section`, `qj-form__row`, `qj-form__actions`, `qj-form__summary`
- `qj-field`, `qj-field__label`, `qj-field__control`, `qj-field__help`, `qj-field__error`, `qj-field__counter`, `qj-field__required`
- `qj-input`, `qj-textarea`, `qj-select`, `qj-select__trigger`, `qj-select__value`, `qj-select__menu`, `qj-select__option`, `qj-select__tag`
- `qj-search`, `qj-search__input`, `qj-search__submit`, `qj-search__clear`, `qj-search__suggestions`, `qj-search__option`
- `qj-checkbox`, `qj-radio`, `qj-switch`, `qj-stepper-input`, `qj-slider`, `qj-rate`
- `qj-date-picker`, `qj-date-picker__input`, `qj-date-picker__panel`, `qj-date-picker__presets`, `qj-date-picker__grid`, `qj-date-picker__cell`, `qj-date-picker__footer`
- `qj-cascader`, `qj-tree-select`, `qj-transfer`, `qj-color-picker`, `qj-code-editor`, `qj-rich-text`
- `qj-filter`, `qj-filter__grid`, `qj-filter__item`, `qj-filter__actions`, `qj-filter__summary`, `qj-filter__chip`, `qj-filter__toggle`

## 内容容器与数据展示

- `qj-card`, `qj-card__header`, `qj-card__title`, `qj-card__meta`, `qj-card__actions`, `qj-card__body`, `qj-card__footer`
- `qj-metric`, `qj-metric__label`, `qj-metric__value`, `qj-metric__unit`, `qj-metric__trend`, `qj-metric__scope`, `qj-metric__source`, `qj-metric__updated`
- `qj-description`, `qj-description__item`, `qj-description__label`, `qj-description__value`
- `qj-list`, `qj-list__item`, `qj-list__media`, `qj-list__content`, `qj-list__meta`, `qj-list__actions`
- `qj-tree`, `qj-tree__item`, `qj-tree__node`, `qj-tree__children`, `qj-timeline`, `qj-timeline__item`
- `qj-chart`, `qj-chart__header`, `qj-chart__title`, `qj-chart__unit`, `qj-chart__legend`, `qj-chart__plot`, `qj-chart__tooltip`, `qj-chart__footer`
- `qj-progress`, `qj-progress__track`, `qj-progress__bar`, `qj-progress__label`, `qj-progress__value`

## 表格与分页

- `qj-table-shell`, `qj-table-shell__toolbar`, `qj-table-shell__filters`, `qj-table-shell__bulkbar`, `qj-table-shell__viewport`, `qj-table-shell__footer`
- `qj-table`, `qj-table__head`, `qj-table__body`, `qj-table__row`, `qj-table__cell`, `qj-table__sort`, `qj-table__resize`, `qj-table__drag`, `qj-table__sticky`, `qj-table__actions`
- modifiers `qj-table--compact|default|comfortable`, `qj-table--striped`, `qj-table--bordered`
- `qj-column-settings`, `qj-column-settings__list`, `qj-column-settings__item`, `qj-column-settings__pin`, `qj-column-settings__drag`
- `qj-pagination`, `qj-pagination__summary`, `qj-pagination__list`, `qj-pagination__item`, `qj-pagination__size`, `qj-pagination__jump`

## 状态、反馈与浮层

- `qj-state`, `qj-state__visual`, `qj-state__title`, `qj-state__description`, `qj-state__actions`; modifiers `qj-state--loading`, `qj-state--empty`, `qj-state--error`, `qj-state--no-result`, `qj-state--forbidden`, `qj-state--offline`
- `qj-skeleton`, `qj-skeleton__line`, `qj-skeleton__circle`, `qj-skeleton__block`, `qj-skeleton__table`, `qj-skeleton__chart`
- `qj-alert`, `qj-alert__icon`, `qj-alert__content`, `qj-alert__title`, `qj-alert__description`, `qj-alert__actions`, `qj-alert__close`
- `qj-toast-region`, `qj-toast`, `qj-toast__icon`, `qj-toast__content`, `qj-toast__action`, `qj-toast__close`
- `qj-modal`, `qj-modal__backdrop`, `qj-modal__dialog`, `qj-modal__header`, `qj-modal__body`, `qj-modal__footer`
- `qj-drawer`, `qj-drawer__backdrop`, `qj-drawer__panel`, `qj-drawer__header`, `qj-drawer__body`, `qj-drawer__footer`
- `qj-popover`, `qj-popover__arrow`, `qj-popover__header`, `qj-popover__body`, `qj-popover__footer`, `qj-tooltip`, `qj-confirm`

## 业务动作与复杂流程

- `qj-upload`, `qj-upload__dropzone`, `qj-upload__trigger`, `qj-upload__list`, `qj-upload__item`, `qj-upload__preview`, `qj-upload__progress`, `qj-upload__error`, `qj-upload__actions`
- `qj-import`, `qj-import__steps`, `qj-import__mapping`, `qj-import__preview`, `qj-import__result`
- `qj-export`, `qj-export__scope`, `qj-export__fields`, `qj-export__progress`, `qj-export__result`
- `qj-steps`, `qj-steps__item`, `qj-steps__marker`, `qj-steps__label`, `qj-steps__content`
- `qj-workflow`, `qj-workflow__node`, `qj-workflow__edge`, `qj-workflow__toolbar`, `qj-approval`, `qj-approval__timeline`, `qj-approval__actions`
- `qj-command`, `qj-command__input`, `qj-command__list`, `qj-command__group`, `qj-command__item`, `qj-command__shortcut`
- `qj-resize-handle`, `qj-drag-handle`, `qj-dropzone`, `qj-split-pane`, `qj-split-pane__panel`

## HTML 语义约束

- 可点击动作使用 `button` 或 `a`，禁止可点击 `div`。
- Tabs、dialog、grid、combobox、tree、menu 等使用对应 ARIA role、键盘模型与 `aria-*` 关联。
- 表格优先原生 `table/th/td`；虚拟表格才使用 ARIA grid，并实现方向键导航。
- 浮层打开后管理焦点、Esc、遮罩关闭策略与焦点归还；危险流程不允许误触遮罩关闭。

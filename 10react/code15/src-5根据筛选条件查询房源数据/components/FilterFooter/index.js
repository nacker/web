import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

function FilterFooter({ style, className, onCancel, onSave, cancelText }) {
  return (
    <Flex style={style} className={[styles.root, className || ''].join(' ')}>
      {/* 取消按钮 */}
      <span
        className={[styles.btn, styles.cancel].join(' ')}
        onClick={onCancel}
      >
        {cancelText}
      </span>

      {/* 确定按钮 */}
      <span className={[styles.btn, styles.ok].join(' ')} onClick={onSave}>
        确定
      </span>
    </Flex>
  )
}

// 默认约束
FilterFooter.defaultProps = {
  cancelText: '取消'
}

export default FilterFooter

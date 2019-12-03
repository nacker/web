import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

function FilterFooter({ style, className, onCancel, onSave }) {
  return (
    <Flex style={style} className={[styles.root, className || ''].join(' ')}>
      {/* 取消按钮 */}
      <span
        className={[styles.btn, styles.cancel].join(' ')}
        onClick={onCancel}
      >
        取消
      </span>

      {/* 确定按钮 */}
      <span className={[styles.btn, styles.ok].join(' ')} onClick={onSave}>
        确定
      </span>
    </Flex>
  )
}

export default FilterFooter

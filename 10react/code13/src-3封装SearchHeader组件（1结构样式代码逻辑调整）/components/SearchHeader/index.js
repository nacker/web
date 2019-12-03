import React from 'react'

import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import { Flex } from 'antd-mobile'

import styles from './index.module.scss'

function SearchHeader({ cityName, history }) {
  return (
    <Flex className={styles.root}>
      <Flex className={styles.searchLeft}>
        <div
          className={styles.location}
          onClick={() => history.push('/citylist')}
        >
          <span>{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>

        <div
          className={styles.searchForm}
          onClick={() => history.push('/search')}
        >
          <i className="iconfont icon-seach" />
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i className="iconfont icon-map" onClick={() => history.push('/map')} />
    </Flex>
  )
}

SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired
}

export default withRouter(SearchHeader)
